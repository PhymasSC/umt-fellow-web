import {
	ActionIcon,
	Avatar,
	Box,
	Card,
	Group,
	Menu,
	Text,
} from "@mantine/core";
import { IconChecks, IconDots, IconTrash } from "@tabler/icons";

const NotificationCard = (props: { text: string }) => {
	const { text } = props;
	//generate random number
	const randomNumber = Math.floor(Math.random() * 100);
	return (
		<Card  sx={{ overflow: "visible" }}>
			<Group>
				<Avatar
					src={`https://picsum.photos/${randomNumber}`}
					radius="xl"
				/>
				<Text>{text}</Text>
				<Box ml="auto">
					<Menu>
						<Menu.Target>
							<ActionIcon>
								<IconDots />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item color="green" icon={<IconChecks />}>
								Mark as read
							</Menu.Item>
							<Menu.Item color="red" icon={<IconTrash />}>
								Clear notification
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Box>
			</Group>
		</Card>
	);
};

export default NotificationCard;
