import { MessageList } from "@components/index";
import {
	Title,
	Paper,
	Flex,
	TextInput,
	Avatar,
	Card,
	Grid,
	Indicator,
	Group,
	Text,
	Stack,
	ActionIcon,
	Textarea,
	Tooltip,
} from "@mantine/core";
import { IconSearch, IconSend } from "@tabler/icons";
import { useRouter } from "next/router";

const Message = () => {
	const router = useRouter();
	const { id } = router.query;

	const data = [
		{
			id: 1,
			name: "John Doe",
			message: "Hey, how are you?",
			avatar: "https://picsum.photos/100",
			isSelected: id == "1" && true,
		},
		{
			id: 2,
			name: "Jane Doe",
			message: "I'm fine, thanks.",
			avatar: "https://picsum.photos/101",
			isSelected: id == "2" && true,
		},
		{
			id: 3,
			name: "David Khor",
			message: "Is this a real life?",
			avatar: "https://picsum.photos/102",
			isSelected: id == "3" && true,
		},
		{
			id: 4,
			name: "Amanda Tan",
			message: "Is this just fantasy?",
			avatar: "https://picsum.photos/103",
			isSelected: id == "4" && true,
		},
		{
			id: 5,
			name: "John Doe",
			message: "Caught in a landslide",
			avatar: "https://picsum.photos/104",
			isSelected: id == "5" && true,
		},
	];
	return (
		<Grid h="90vh" grow>
			<Grid.Col h="100%" span={1}>
				<Paper h="100%" withBorder p={20}>
					<Flex direction="column" gap={30}>
						<Title order={2}>Messages</Title>
						<TextInput
							placeholder="Search user"
							icon={<IconSearch size={14} />}
						/>

						<MessageList data={data} />
					</Flex>
				</Paper>
			</Grid.Col>
			<Grid.Col h="100%" span={8}>
				<Flex justify={"center"} align={"center"} h="100%">
					{(id && (
						<Card withBorder h="100%" w="100%">
							<Stack h="100%">
								<Flex gap={20}>
									<Group>
										<Indicator
											dot
											inline
											size={16}
											offset={7}
											position="bottom-end"
											color="green"
											withBorder
										>
											<Avatar
												radius="xl"
												size="lg"
												src={
													data[parseInt(id[0]) - 1][
														"avatar"
													]
												}
											/>
										</Indicator>
									</Group>
									<Flex
										direction="column"
										justify="space-between"
									>
										<Title order={2}>
											{data[parseInt(id[0]) - 1]["name"]}
										</Title>
										<Text color="dimmed">Online</Text>
									</Flex>
								</Flex>
								<Card withBorder h="100%">
									<Flex gap={10} align="flex-end">
										<Avatar
											radius="xl"
											src={
												data[parseInt(id[0]) - 1][
													"avatar"
												]
											}
										/>
										<Stack spacing={5}>
											<Paper
												p={10}
												radius="lg"
												sx={(theme) => ({
													borderBottomLeftRadius:
														"3px",
													backgroundColor:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[1]
															: theme.colors
																	.blue[7],
													color:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[9]
															: theme.colors
																	.gray[1],
												})}
											>
												Test
											</Paper>
											<Paper
												p={10}
												radius="lg"
												sx={(theme) => ({
													borderTopLeftRadius: "3px",
													borderBottomLeftRadius:
														"3px",
													backgroundColor:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[1]
															: theme.colors
																	.blue[7],
													color:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[9]
															: theme.colors
																	.gray[1],
												})}
											>
												Test
											</Paper>
											<Paper
												p={10}
												radius="lg"
												sx={(theme) => ({
													borderTopLeftRadius: "3px",
													backgroundColor:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[1]
															: theme.colors
																	.blue[7],
													color:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.gray[9]
															: theme.colors
																	.gray[1],
												})}
											>
												Test
											</Paper>
										</Stack>
									</Flex>
								</Card>
								<Card h="100%">
									<Flex
										justify="center"
										align="center"
										w="100%"
									>
										<Textarea
											p={30}
											size="xl"
											placeholder="Aa"
											minRows={1}
											maxRows={5}
											w="100%"
										/>
										<ActionIcon
											color="blue"
											size="xl"
											variant="light"
											radius="xs"
										>
											<IconSend size={20} />
										</ActionIcon>
									</Flex>
								</Card>
							</Stack>
						</Card>
					)) || (
						<Title align="center">
							Select a conversation or start a new one!
						</Title>
					)}
				</Flex>
			</Grid.Col>
		</Grid>
	);
};

export default Message;
