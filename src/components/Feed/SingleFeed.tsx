import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	Container,
	Stack,
	Avatar,
	Text,
	Group,
	ActionIcon,
	Grid,
	Spoiler,
	Space,
	Title,
	Skeleton,
	Tooltip,
	Button,
	TypographyStylesProvider,
} from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import { Gallery, Typography } from "@components/index";
import FeedSetting from "./FeedSetting";
import { GET_THREAD_UPVOTES_AND_DOWNVOTES, GET_THREAD_VOTES } from "@operations/queries";
import { VOTE_THREAD } from "@operations/mutations";
import { useStyles } from "./SingleFeed.style";

interface SingleFeedProps {
	feed?: {
		title: string;
		author: {
			id: string;
			name: string;
			image: string;
		};
		images: string[];
		created_at: string;
		updated_at: string;
		description: string;
		id: string;
	};
	loading?: boolean;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const SingleFeed: React.FC<SingleFeedProps> = ({ feed, loading }) => {
	const [votes, setVotes] = useState<number>(0);
	const [voteThread] = useMutation(VOTE_THREAD);
	const { classes } = useStyles();
	const { data: session } = useSession();

	const { loading: votesLoading, data: votesData } = useQuery(GET_THREAD_UPVOTES_AND_DOWNVOTES, {
		variables: {
			threadId: feed?.id,
		},
	});

	const { loading: votesCountLoading, data: votesCountData } = useQuery(GET_THREAD_VOTES, {
		variables: {
			threadId: feed?.id,
		},
	});

	dayjs.extend(relativeTime);

	useEffect(() => {
		if (!votesLoading && votesData?.getThreadUpvotesAndDownvotes) {
			const upvotes = votesData.getThreadUpvotesAndDownvotes[0];
			const downvotes = votesData.getThreadUpvotesAndDownvotes[1];
			setVotes(upvotes - downvotes);
		}
	}, [votesLoading, votesData]);

	if (!feed || loading) {
		return (
			<Container className={classes.container} fluid>
				<Stack>
					<Group position="apart">
						<Group>
							<Skeleton width={50} height={50} radius="xl" />
							<Skeleton width={200} height={30} radius="md" />
							<Space w="xs" />
						</Group>
						<Skeleton width={100} height={30} radius="md" />
					</Group>
					<Grid align="flex-start">
						<Grid.Col span={1}>
							<Stack align="center" spacing="xs">
								<ActionIcon>
									<IconChevronUp />
								</ActionIcon>
								<Skeleton width={30} height={30} radius="md" />
								<ActionIcon>
									<IconChevronDown />
								</ActionIcon>
							</Stack>
						</Grid.Col>
						<Grid.Col span={11}>
							<Title size="h3" weight="600">
								<Skeleton width={400} height={30} radius="md" />
							</Title>
							<Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
								<Skeleton width={650} />
							</Spoiler>
							<Skeleton width={650} />

							<Space h="md" />
							<Stack>
								<Skeleton width="100%" height={30} radius="md" />
								<Skeleton width="100%" height={30} radius="md" />
								<Skeleton width="70%" height={30} radius="md" />
							</Stack>
						</Grid.Col>
					</Grid>
				</Stack>
			</Container>
		);
	}

	const { title, author, created_at, updated_at, description, id, images } = feed;

	const handleVote = async (type: string) => {
		const res = await voteThread({
			variables: {
				threadId: id,
				userId: session?.user?.id,
				type,
			},
		});

		if (res?.data?.voteThread) {
			const { upvotes, downvotes } = res.data.voteThread;
			setVotes(upvotes - downvotes);
		}
	};

	return (
		<Container className={classes.container} fluid>
			<Stack>
				<Group position="apart">
					<Link href={`/profile/${author.id}`} passHref>
						<Button
							component="a"
							variant="subtle"
							h={50}
							color="gray"
							sx={{ color: "inherit", textDecoration: "none" }}
						>
							<Group>
								<Avatar src={author.image} radius="xl" alt="Avatar" />
								<Text weight="700">{author.name}</Text>
								<Space w="xs" />
							</Group>
						</Button>
					</Link>
					<Group>
						<Tooltip
							multiline
							label={`Created at ${dayjs(new Date(created_at)).toDate()}`}
							withArrow
							position="top"
						>
							<Text color="dimmed">
								{created_at !== updated_at && "Edited "}
								{dayjs(new Date(updated_at)).fromNow()}
							</Text>
						</Tooltip>
						<FeedSetting author={author} />
					</Group>
				</Group>
				<Grid align="flex-start">
					<Grid.Col span={1}>
						<Stack align="center" spacing="xs">
							<ActionIcon onClick={() => handleVote("UPVOTE")}>
								<IconChevronUp />
							</ActionIcon>
							<Text>{formatter.format(votes)}</Text>
							<ActionIcon onClick={() => handleVote("DOWNVOTE")}>
								<IconChevronDown />
							</ActionIcon>
						</Stack>
					</Grid.Col>
					<Grid.Col span={11}>
						<Title size="h3" weight="600">
							{title}
						</Title>
						<Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
							<TypographyStylesProvider>
								<Typography>
									<div dangerouslySetInnerHTML={{ __html: description }} />
								</Typography>
							</TypographyStylesProvider>
						</Spoiler>

						{images && (
							<>
								<Space h="md" />
								<Gallery
									images={images.map(
										(image) =>
											`https://ik.imagekit.io/umtfellow/tr:h-800/${image}`
									)}
								/>
							</>
						)}
					</Grid.Col>
				</Grid>
			</Stack>
		</Container>
	);
};

export default SingleFeed;