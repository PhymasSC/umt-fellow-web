import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	container: {
		padding: "2rem",
		"&:hover": {
			cursor: "pointer",
			boxShadow: `0px 0px 0px 1px ${
				theme.colorScheme === "light"
					? theme.colors.dark[5]
					: theme.colors.gray[0]
			} inset`,
		},
	},
}));
