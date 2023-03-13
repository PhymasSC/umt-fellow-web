import { Stack, Group, Switch } from "@mantine/core";
import SettingLayout from "./SettingLayout";

const ChatSetting = () => {
	const configuration = [
		{
			label: "Read Receipts",
			description:
				"Control whether others can see when you have read their messages",
		},
	];
	return (
		<Stack>
			{configuration.map((item, index) => {
				return (
					<SettingLayout
						key={item.label}
						layout="horizontal"
						label={item.label}
						description={item.description}
						input={
							<Group>
								<Switch checked />
								Enable
							</Group>
						}
					/>
				);
			})}
		</Stack>
	);
};

export default ChatSetting;
