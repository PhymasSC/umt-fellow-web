import { Paper, createStyles } from "@mantine/core";
import { Authentication } from "@components/index";
import { NextPage } from "next";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    padding: "3em",
    backgroundSize: "cover",
    backgroundImage: "url('/auth-bg.jpeg')",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "0",
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minWidth: "450px",
    width: "10em",
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
    <>
      <Head>
        <title>Register | UMT Fellow</title>
      </Head>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Authentication defaultPage="register" />
        </Paper>
      </div>
    </>
  );
};

export default Register;
