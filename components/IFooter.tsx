import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import {
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandInstagram,
} from "@tabler/icons";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
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
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,

		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column",
		},
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			marginTop: theme.spacing.md,
		},
	},
}));

const IFooter = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Image src="/logo.png" alt="Logo" width={50} height={50} />
				<Group
					spacing={0}
					className={classes.links}
					position="right"
					noWrap
				>
					<ActionIcon size="lg">
						<IconBrandTwitter size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg">
						<IconBrandYoutube size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg">
						<IconBrandInstagram size={18} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	);
};

export default IFooter;
