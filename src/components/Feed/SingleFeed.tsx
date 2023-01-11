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
} from "@mantine/core";
import { useStyles } from "./SingleFeed.style";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Gallery } from "@components/index";

type Props = {
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
// type Props = {
// 	title: string;
// 	username: string;
// 	profilePic?: string;
// 	createdTime: string;
// 	content: string;
// 	voteCount: number;
// 	badges: {
// 		value: string;
// 		color: string;
// 	}[];
// 	image?: string;
// 	slug: string;
// };

const SingleFeed: React.FC<Props> = (data: Props) => {
	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	dayjs.extend(relativeTime);
	const { title, author, createdAt, description, id, images } = data;
	const { classes } = useStyles();

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
							<Text>{description}</Text>
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
