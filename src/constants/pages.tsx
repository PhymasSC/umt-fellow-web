import {
	IconBell,
	IconHome,
	IconMessageCircle,
	IconWorld,
} from "@tabler/icons";

export const LINKS = [
	{ link: "/", label: "Home", icon: <IconHome /> },
	{ link: "/explore", label: "Explore", icon: <IconWorld /> },
	{ link: "/message", label: "Message", icon: <IconMessageCircle /> },
	{
		link: "/notification",
		label: "Notification",
		icon: <IconBell />,
	},
];
