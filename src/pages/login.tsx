import { Paper, createStyles } from "@mantine/core";
import { Authentication } from "@/components/index";
import { NextPage } from "next";
import Head from "next/head";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    padding: "3em",
    backgroundSize: "cover",
    backgroundImage: "url('/auth-bg.jpeg')",

    [theme.fn.smallerThan("sm")]: {
      padding: "0",
      justifyContent: "center",
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minWidth: "600px",
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

interface ErrorTypes {
  [key: string]: {
    title: string;
    message: string;
  };
}

const errorTypes: ErrorTypes = {
  OAuthCreateAccount: {
    title: "Error",
    message: "Failed to create an account with this provider.",
  },
  OAUTH_GET_ACCESS_TOKEN_ERROR: { title: "Error", message: "Please try again" },
  OAUTH_V1_GET_ACCESS_TOKEN_ERROR: {
    title: "Error",
    message: "Please try again",
  },
  OAUTH_GET_PROFILE_ERROR: { title: "Error", message: "Please try again" },
  OAUTH_PARSE_PROFILE_ERROR: { title: "Error", message: "Please try again" },
  OAUTH_CALLBACK_HANDLER_ERROR: { title: "Error", message: "Please try again" },
  OAuthAccountNotLinked: {
    title: "Incorrect Login Method",
    message:
      "It appears you have already registered with this email address. Please login using alternative way.",
  },
  CredentialsSignin: {
    title: "Invalid Credential",
    message:
      "The username or password you entered is incorrect. Please try again.",
  },
};

const Login: NextPage = () => {
  const router = useRouter();
  const { classes } = useStyles();

  useEffect(() => {
    if (router.query.error) {
      notifications.show({
        title: `Error: ${errorTypes[router.query.error as string].title}`,
        message: errorTypes[router.query.error as string].message,
        color: "red",
        icon: <IconAlertCircle />,
        autoClose: 5000,
      });
    }
  }, [router.query.error]);

  return (
    <>
      <Head>
        <title>Login | UMT Fellow</title>
      </Head>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Authentication />
        </Paper>
      </div>
    </>
  );
};

export default Login;
