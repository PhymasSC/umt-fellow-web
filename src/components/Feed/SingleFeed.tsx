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
} from "@mantine/core";
import { useStyles } from "./SingleFeed.style";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Gallery, Typography } from "@components/index";

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
	createdAt: string;
	description: string;
	id: string;
};

const SingleFeed: React.FC<SingleFeedProps> = (props) => {
	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	const { classes } = useStyles();
	dayjs.extend(relativeTime);
	if (!props.feed || props.loading)
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
	const { title, author, createdAt, description, id, images } = props?.feed;

	return (
		<Container className={classes.container} fluid>
			<Stack>
				<Group position="apart">
					<Group>
						<Avatar src={author.image} radius="xl" alt="Avatar" />
						<Text weight="700">{author.name}</Text>
						<Space w="xs" />
						{/* {badges?.length > 0 &&
							badges.map((badge, index) => (
								<Badge
									color={badge.color}
									size="lg"
									radius="sm"
									key={index}
								>
									{badge.value}
								</Badge>
							))} */}
					</Group>
					<Text color="dimmed">
						{dayjs(new Date(createdAt)).fromNow()}
					</Text>
				</Group>
				<Grid align="flex-start">
					<Grid.Col span={1}>
						<Stack align="center" spacing="xs">
							<ActionIcon>
								<IconChevronUp />
							</ActionIcon>
							{/* <Text>{formatter.format(voteCount)}</Text> */}
							<ActionIcon>
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
