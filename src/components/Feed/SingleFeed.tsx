import {
	Container,
	Stack,
	Avatar,
	Text,
	Group,
	ActionIcon,
} from "@mantine/core";
import { useStyles } from "./SingleFeed.style";
import { IconThumbUp, IconThumbDown, IconMessageCircle2 } from "@tabler/icons";

type Props = {
	username: string;
	profilePic: string | null | undefined;
	createdTime: string;
	content: string;
};
const SingleFeed: React.FC<Props> = (data: Props) => {
	const { username, profilePic, createdTime, content } = data;
	const { classes } = useStyles();
	return (
		<Container className={classes.container}>
			<Stack>
				<Group position="apart">
					<Group>
						<Avatar src={profilePic} radius="xl" alt="Avatar" />
						<Text
							weight="500"
							variant="gradient"
							gradient={{ from: "indigo", to: "cyan", deg: 45 }}
						>
							{username}
						</Text>
					</Group>
					<Text color="dimmed">{createdTime}</Text>
				</Group>
				<Text weight="500" lineClamp={4}>
					{content}
				</Text>
				<Group>
					<ActionIcon color="green" radius="xl">
						<IconThumbUp size={18} />
					</ActionIcon>
					<ActionIcon color="red" radius="xl">
						<IconThumbDown size={18} />
					</ActionIcon>
					<ActionIcon color="orange" radius="xl">
						<IconMessageCircle2 size={18} />
					</ActionIcon>
				</Group>
			</Stack>
		</Container>
	);
};

export default SingleFeed;
