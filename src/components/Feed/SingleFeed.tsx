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
	AspectRatio,
	Box,
} from "@mantine/core";
import { useStyles } from "./SingleFeed.style";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import { useFullscreen } from "@mantine/hooks";

type Props = {
	title: string;
	username: string;
	profilePic?: string;
	createdTime: string;
	content: string;
	voteCount: string;
	badges: {
		value: string;
		color: string;
	}[];
	image?: string;
};

const SingleFeed: React.FC<Props> = (data: Props) => {
	const {
		username,
		profilePic,
		createdTime,
		content,
		voteCount,
		badges,
		image,
		title,
	} = data;
	const { classes } = useStyles();

	return (
		<Container className={classes.container} fluid>
			<Stack>
				<Group position="apart">
					<Group>
						<Avatar src={profilePic} radius="xl" alt="Avatar" />
						<Text weight="700">{username}</Text>
						<Space w="xs" />
						{badges?.length > 0 &&
							badges.map((badge, index) => (
								<Badge
									color={badge.color}
									size="lg"
									radius="sm"
									key={index}
								>
									{badge.value}
								</Badge>
							))}
					</Group>
					<Text color="dimmed">{createdTime}</Text>
				</Group>
				<Grid align="flex-start">
					<Grid.Col span={1}>
						<Stack align="center" spacing="xs">
							<ActionIcon>
								<IconChevronUp />
							</ActionIcon>
							<Text>{voteCount}</Text>
							<ActionIcon>
								<IconChevronDown />
							</ActionIcon>
						</Stack>
					</Grid.Col>
					<Grid.Col span={11}>
						<Title size="h3">{title}</Title>
						<Spoiler
							maxHeight={120}
							showLabel="Show more"
							hideLabel="Hide"
						>
							<Text weight="500">{content}</Text>
						</Spoiler>
						{(image !== "undefined" && image !== null) ?? (
							<>
								<Space h="md" />

								<Image
									src={image}
									alt="Image"
									radius="md"
									width="100%"
									withPlaceholder
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
