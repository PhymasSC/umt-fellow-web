import {
	Card,
	Container,
	Flex,
	Stack,
	Switch,
	Tabs,
	Text,
} from "@mantine/core";
import { createStyles } from "@mantine/core";

interface Setting {
	setting: {
		accountSettings: SettingProps;
		securitySettings: SettingProps;
		notificationSettings: SettingProps;
		communitySettings: SettingProps;
		chatSettings: SettingProps;
	};
}

interface SettingProps {
	value: string;
	label: string;
	description: string;
	data: {
		label: string;
		description: string;
	}[];
}

const tabs = [
	"Account",
	"Security & Privacy",
	"Notification",
	"Chat & Messaging",
];

const Setting: React.FC<Setting> = (props) => {
	const { setting } = props;

	const items = tabs.map((tab) => (
		<Tabs.Tab value={tab} key={tab}>
			{tab}
		</Tabs.Tab>
	));

	return (
		<>
			<Card
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[7]
							: theme.white,
				})}
			>
				<Tabs defaultValue="Account">
					<Tabs.List>{items}</Tabs.List>
					<Container p={10}>
						{Object.entries(setting).map(([key, value]) => {
							return (
								<Tabs.Panel
									key={key}
									value={value.value}
									pt="xs"
								>
									<Text size="md" weight={700}>
										{value.label}
									</Text>
									<Text
										size="xs"
										color="dimmed"
										mt={3}
										mb="xl"
									>
										{value.description}
									</Text>
									{value.data.map((item, index) => {
										console.log(`Item:`, item);

										return (
											<Stack key={index}>
												<Flex
													w="100%"
													justify="space-between"
												>
													<Stack spacing={0}>
														<Text
															size="sm"
															weight={500}
														>
															{item.label}
														</Text>
														<Text
															size="xs"
															color="dimmed"
															mt={3}
															mb="xl"
														>
															{item.description}
														</Text>
													</Stack>
													<Switch
														checked
														label="Enable"
													/>
												</Flex>
											</Stack>
										);
									})}
								</Tabs.Panel>
							);
						})}
					</Container>
				</Tabs>
			</Card>
		</>
	);
};

export default Setting;
