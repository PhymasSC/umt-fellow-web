import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	container: {
		padding: "2rem",
		"&:hover": {
			cursor: "pointer",
			backgroundColor: `${
				theme.colorScheme === "light"
					? theme.colors.gray[0]
					: theme.colors.dark[5]
			}`,
		},
	},
}));
