import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[5]
				: theme.colors.gray[2]
		}`,
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: theme.spacing.xl,

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		},
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.md,
		},
	},

	logo: {
		display: "flex",
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		},
	},
}));
