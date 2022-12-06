import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	container: {
		padding: "2rem",
		"&:hover": {
			cursor: "pointer",
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
		},
	},
}));
