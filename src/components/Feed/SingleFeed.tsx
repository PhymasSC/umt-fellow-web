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
	Badge,
	Title,
	Image,
	TypographyStylesProvider,
	Skeleton,
	Tooltip,
	Box,
	Button,
} from "@mantine/core";
import { useStyles } from "./SingleFeed.style";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Gallery, Typography } from "@components/index";
import FeedSetting from "./FeedSetting";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { VOTE_THREAD } from "@operations/mutations";
import {
	GET_THREAD_UPVOTES_AND_DOWNVOTES,
	GET_THREAD_VOTES,
} from "@operations/queries";
import { useEffect, useState } from "react";

interface SingleFeedProps {
	feed?: feed;
	loading?: boolean;
}

type feed = {
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

const SingleFeed: React.FC<SingleFeedProps> = (props) => {
	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	const [voteThread] = useMutation(VOTE_THREAD);
	const { loading: votesLoading, data: votesData } = useQuery(
		GET_THREAD_UPVOTES_AND_DOWNVOTES,
		{
			variables: { threadId: props.feed?.id },
		}
	);
	const { loading, data } = useQuery(GET_THREAD_VOTES, {
		variables: { threadId: props.feed?.id },
	});
	const [votes, setVotes] = useState("0");
	const { data: session } = useSession();
	const { classes } = useStyles();
	dayjs.extend(relativeTime);

	useEffect(() => {
		if (!votesLoading) {
			setVotes(
				formatter.format(
					votesData?.getThreadUpvotesAndDownvotes[0] -
						votesData?.getThreadUpvotesAndDownvotes[1]
				)
			);
		}
	}, [votesLoading]);
	// Skeleton loading
	if (!props.feed || props.loading) {
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
							<Spoiler
								maxHeight={120}
								showLabel="Show more"
								hideLabel="Hide"
							>
								<Skeleton width={650} />
							</Spoiler>
							<Skeleton width={650} />

							<Space h="md" />
							<Stack>
								<Skeleton
									width="100%"
									height={30}
									radius="md"
								/>
								<Skeleton
									width="100%"
									height={30}
									radius="md"
								/>
								<Skeleton width="70%" height={30} radius="md" />
							</Stack>
						</Grid.Col>
					</Grid>
				</Stack>
			</Container>
		);
	}

	const { title, author, created_at, updated_at, description, id, images } =
		props?.feed;

	const voteHandler = async (vote: string) => {
		const res = await voteThread({
			variables: {
				threadId: id,
				userId: session?.user?.id,
				type: vote,
			},
		});

		setVotes(
			formatter.format(
				res?.data?.voteThread.upvotes - res?.data?.voteThread.downvotes
			)
		);
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
								<Avatar
									src={author.image}
									radius="xl"
									alt="Avatar"
								/>
								<Text weight="700">{author.name}</Text>
								<Space w="xs" />
							</Group>
						</Button>
					</Link>
					<Group>
						<Tooltip
							multiline
							label={`Created at ${dayjs(
								new Date(created_at)
							).toDate()}`}
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
							<ActionIcon onClick={() => voteHandler("UPVOTE")}>
								<IconChevronUp />
							</ActionIcon>
							<Text>{votes}</Text>
							<ActionIcon onClick={() => voteHandler("DOWNVOTE")}>
								<IconChevronDown />
							</ActionIcon>
						</Stack>
					</Grid.Col>
					<Grid.Col span={11}>
						<Title size="h3" weight="600">
							{title}
						</Title>
						<Spoiler
							maxHeight={120}
							showLabel="Show more"
							hideLabel="Hide"
						>
							<TypographyStylesProvider>
								<Typography>
									<div
										dangerouslySetInnerHTML={{
											__html: description,
										}}
									/>
								</Typography>
							</TypographyStylesProvider>
						</Spoiler>
						{(author.image !== "undefined" &&
							author.image !== null) ?? (
							<>
								<Space h="md" />

								<Image
									src={author.image}
									alt="Image"
									radius="md"
									width="100%"
									withPlaceholder
								/>
							</>
						)}

						<Space h="md" />
						{images && (
							<Gallery
								images={images.map(
									(image) =>
										(image = `https://ik.imagekit.io/umtfellow/tr:h-300/${image}`)
								)}
							></Gallery>
						)}
					</Grid.Col>
				</Grid>
			</Stack>
		</Container>
	);
};

export default SingleFeed;
