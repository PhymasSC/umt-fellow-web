//@ts-nocheck
import { NextPage } from "next";
import { Setting as SettingComponent } from "@components/index";
import { GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";
import { Container } from "@mantine/core";

const configurations = {
	accountSettings: {
		value: "Account",
		label: "Manage Your Account",
		description:
			"Edit your profile information, change your password, and manage your linked accounts",
		data: [
			{
				label: "Display Name",
				type: "toggle", 
				description:
					"The name displayed on your profile and @mention by other users",
			},
			{
				label: "Email Address",
				type: "toggle",
				description:
					"Update the email address associated with your account",
			},
			{
				label: "Password",
				type: "toggle",
				description:
					"Change the password used to log in to your account.",
			},
			{
				label: "Delete Account",
				type: "toggle",
				description:
					"Permanently delete your account and all associated data",
			},
		],
	},
	securitySettings: {
		value: "Security & Privacy",
		label: "Protect Your Privacy",
		description:
			"Change your privacy settings, enable two-factor authentication, and review your activity log",
		data: [
			{
				label: "Profile Visibility",
				type: "toggle",
				description: "Control who can see your profile information",
			},
			{
				label: "Two-Factor Authentication",
				type: "toggle",
				description:
					"Enable an extra layer of security for logging in to your account",
			},
		],
	},
	notificationSettings: {
		value: "Notification",
		label: "Configure Notifications",
		description:
			"Choose what notifications you want to receive, and customize how and when they are delivered",
		data: [
			{
				label: "Votes",
				type: "toggle",
				description:
					"Receive notifications when someone votes on your thread or comment",
			},
			{
				label: "Follows",
				type: "toggle",
				description: "Receive notifications when someone follows you",
			},
			{
				label: "Mentions",
				type: "toggle",
				description:
					"Receive notifications when someone mentions you in a thread or comment",
			},
			{
				label: "Direct Messages",
				type: "toggle",
				description:
					"Receive notifications for direct messages from other users",
			},
			{
				label: "Community Invitations",
				type: "toggle",
				description:
					"Be notified when you are invited to join a community",
			},
			{
				label: "Replies",
				type: "toggle",
				description:
					"Receive notifications for replies to your thread/ comments",
			},
			{
				label: "Recommendations",
				type: "toggle",
				description:
					"Digest with best community posts from previous week",
			},
			{
				label: "Do Not Disturb",
				type: "toggle",
				description: "Turn off all notifications for a period of time",
			},
		],
	},
	chatSettings: {
		value: "Chat & Messaging",
		label: "Communicate with Others",
		description:
			"Manage your chat and messaging settings, and configure how you want to be notified of new messages",
		data: [
			{
				label: "Read Receipts",
				type: "toggle",
				description:
					"Control whether others can see when you have read their messages",
			},
		],
	},
};

const Setting: NextPage = (props) => {
	return (
		<>
			<Container>
				<SettingComponent setting={configurations}> </SettingComponent>
			</Container>
		</>
	);
};

// export async function getServerSideProps(context: { params: { id: string } }) {
// 	const id = context.params.id;
// 	try {
// 		const { data } = await client.query({
// 			query: GET_USER,
// 			variables: { id },
// 		});
// 		return {
// 			props: data,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	return {
// 		notFound: true,
// 	};
// }
export default Setting;
