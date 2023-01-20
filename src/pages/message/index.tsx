import { MessageList } from "@components/index";
import { AppShell, Title, Paper, Flex, TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const data = [
	{
		id: 1,
		name: "John Doe",
		message: "Hey, how are you?",
		avatar: "https://picsum.photos/100",
		isSelected: true,
	},
	{
		id: 2,
		name: "Jane Doe",
		message: "I'm fine, thanks.",
		avatar: "https://picsum.photos/101",
		isSelected: false,
	},
	{
		id: 3,
		name: "David Khor",
		message: "Is this a real life?",
		avatar: "https://picsum.photos/102",
		isSelected: false,
	},
	{
		id: 4,
		name: "Amanda Tan",
		message: "Is this just fantasy?",
		avatar: "https://picsum.photos/103",
		isSelected: false,
	},
	{
		id: 5,
		name: "John Doe",
		message: "Caught in a landslide",
		avatar: "https://picsum.photos/104",
		isSelected: false,
	},
	{
		id: 6,
		name: "中文名字",
		message: "Caught in a landslide",
		avatar: "https://picsum.photos/106",
	},
];

const Message = () => {
	return (
		<AppShell
			navbar={
				<Paper withBorder w={400} p={20}>
					<Flex direction="column" gap={30}>
						<Title order={2}>Messages</Title>
						<TextInput
							placeholder="Search user"
							icon={<IconSearch size={14} />}
						/>

						<MessageList data={data} />
					</Flex>
				</Paper>
			}
		>
			<Flex justify={"center"} align={"center"} h={"80vh"}>
				<Title align={"center"}>
					Select a chat or start a new conversation!
				</Title>
			</Flex>
		</AppShell>
	);
};

export default Message;
