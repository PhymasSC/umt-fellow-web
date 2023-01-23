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
	accountSettings: SettingProps;
	securitySettings: SettingProps;
	notificationSettings: SettingProps;
	communitySettings: SettingProps;
	chatSettings: SettingProps;
}

interface SettingProps {
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
	"Community",
	"Chat & Messaging",
];

const Setting: React.FC<Setting> = (props) => {
	const {
		accountSettings,
		securitySettings,
		notificationSettings,
		communitySettings,
		chatSettings,
	} = props;

	const items = tabs.map((tab) => (
		<Tabs.Tab value={tab} key={tab}>
			{tab}
		</Tabs.Tab>
	));

	console.log(accountSettings);
	const accountItems = (
		<Tabs.Panel value="Account" pt="xs">
			<Text size="md" weight={700}>
				{accountSettings.label}
			</Text>
			<Text size="xs" color="dimmed" mt={3} mb="xl">
				{accountSettings.description}
			</Text>
			{accountSettings.data.map((item, index) => (
				<Stack key={index}>
					<Flex w="100%" justify="space-between">
						<Stack spacing={0}>
							<Text size="sm" weight={500}>
								{item.label}
							</Text>
							<Text size="xs" color="dimmed" mt={3} mb="xl">
								{item.description}
							</Text>
						</Stack>
						<Switch value="1" label="Enable" />
					</Flex>
				</Stack>
			))}
		</Tabs.Panel>
	);

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
						<Tabs.Panel value="Account" pt="xs">
							{accountItems}
						</Tabs.Panel>

						<Tabs.Panel value="Security & Privacy" pt="xs">
							Messages tab content
						</Tabs.Panel>

						<Tabs.Panel value="Notification" pt="xs">
							Settings tab content
						</Tabs.Panel>

						<Tabs.Panel value="Community" pt="xs">
							Settings tab content
						</Tabs.Panel>

						<Tabs.Panel value="Chat & Messaging" pt="xs">
							Settings tab content
						</Tabs.Panel>
					</Container>
				</Tabs>
			</Card>
		</>
	);
};

export default Setting;
