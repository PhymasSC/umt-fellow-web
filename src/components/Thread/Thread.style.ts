import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	container: {
		[theme.fn.smallerThan("md")]: {
			padding: 0,
		},
	},
}));
