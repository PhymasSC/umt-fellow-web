import {
	createStyles,
	Container,
	Title,
	Text,
	Button,
	Group,
	Image,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";
import { APP_NAME } from "@constants/metadata";

const useStyles = createStyles((theme) => ({
	root: {
		display: "flex",
		height: "90vh",
		justifyContent: "center",
		alignItems: "center",
	},

	inner: {
		position: "relative",
	},

	image: {
		position: "absolute",
		top: -250,
		right: 0,
		left: 0,
		opacity: 0.6,
		userSelect: "none",
	},

	content: {
		position: "relative",
		zIndex: 0,

		[theme.fn.smallerThan("sm")]: {
			paddingTop: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: "center",
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan("sm")]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
		margin: "auto",
		marginTop: theme.spacing.xl,
		marginBottom: `calc(${theme.spacing.xl}) * 1.5`,
		mixBlendMode: "difference",
	},
}));

const _404: NextPage = () => {
	const { classes } = useStyles();

	return (
		<>
			<Head>
				<title>{`Page not found | ${APP_NAME}`}</title>
			</Head>
			<Container className={classes.root}>
				<div className={classes.inner}>
					<Image
						src="/404_Illustration.svg"
						alt="Error 404"
						className={classes.image}
					/>
					<div className={classes.content}>
						<Title className={classes.title}>
							Nothing to see here
						</Title>
						<Text
							color="dimmed"
							size="lg"
							align="center"
							className={classes.description}
						>
							Page you are trying to open does not exist. You may
							have mistyped the address, or the page has been
							moved to another URL. If you think this is an error
							contact support.
						</Text>
						<Group position="center">
							<Link href="/" passHref>
								<Button size="md">
									Take me back to home page
								</Button>
							</Link>
						</Group>
					</div>
				</div>
			</Container>
		</>
	);
};

export default _404;
