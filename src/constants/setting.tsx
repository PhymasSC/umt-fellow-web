export const SETTINGS = {
	accountSettings: {
		value: "Account",
		label: "Manage Your Account",
		description:
			"Edit your profile information, change your password, and manage your linked accounts",
	},
	securitySettings: {
		value: "Security & Privacy",
		label: "Protect Your Privacy",
		description:
			"Change your privacy settings, enable two-factor authentication, and review your activity log",
	},
	notificationSettings: {
		value: "Notification",
		label: "Configure Notifications",
		description:
			"Choose what notifications you want to receive, and customize how and when they are delivered",
	},
	communitySettings: {
		value: "Community",
		label: "Manage Your Communities",
		description:
			"Control your community settings, and manage your community memberships",
		data: [
			{
				label: "Community Memberships",
				type: "toggle",
				description:
					"View and manage your community memberships, and leave communities",
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
