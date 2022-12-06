import {
	Paper,
	createStyles,
} from "@mantine/core";
import { Authentication } from "@components/index";
import { NextPage } from "next";

const useStyles = createStyles((theme) => ({
	wrapper: {
		height: "100vh",
		padding: "3em",
		backgroundSize: "cover",
		backgroundImage:
			"url(https://images.unsplash.com/photo-1633155518197-afebeecd096d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80)",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: "0",
		},
	},

	form: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		border: `1px solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[3]
		}`,
		height: "90%",
		maxWidth: "450px",
		paddingTop: 80,
		borderRadius: ".5em",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: "100%",
			borderRadius: "0",
			height: "100vh",
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	logo: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		width: 120,
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

const Register: NextPage = () => {
	const { classes } = useStyles();
	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Authentication defaultPage="register" />
			</Paper>
		</div>
	);
};

export default Register;
