import { Stack, Group, Switch } from "@mantine/core";
import SettingLayout from "./SettingLayout";

const NotificationSetting = () => {
	const configuration = [
		{
			label: "Votes",
			description:
				"Receive notifications when someone votes on your thread or comment",
		},
		{
			label: "Follows",
			description: "Receive notifications when someone follows you",
		},
		{
			label: "Mentions",
			description:
				"Receive notifications when someone mentions you in a thread or comment",
		},
		{
			label: "Direct Messages",
			description:
				"Receive notifications for direct messages from other users",
		},
		{
			label: "Community Invitations",
			description: "Be notified when you are invited to join a community",
		},
		{
			label: "Replies",
			description:
				"Receive notifications for replies to your thread/ comments",
		},
		{
			label: "Recommendations",
			description: "Digest with best community posts from previous week",
		},
		{
			label: "Do Not Disturb",
			description: "Turn off all notifications for a period of time",
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

export default NotificationSetting;
