import {
  Paper,
  createStyles,
  Button,
  Stack,
  Text,
  PasswordInput,
} from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { IconLock } from "@tabler/icons";
import { matches, useForm } from "@mantine/form";
import { PASSWORD_PATTERN } from "@constants/regex";
import { useState } from "react";
import { useRouter } from "next/router";

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

const ResetPassword: NextPage = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { token } = router.query;

  const form = useForm({
    initialValues: {
      newPassword: "",
      repeatPassword: "",
    },
    validate: {
      newPassword: matches(
        PASSWORD_PATTERN,
        "Password should include at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    },
  });

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.values.newPassword !== form.values.repeatPassword) {
      form.setErrors({ repeatPassword: "Passwords do not match" });
      return;
    }
    form.validate();

    setLoading(true);

    const result = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password: form.values.newPassword }),
    });

    const response = await result.json();
    if (response.err) {
      form.setErrors({
        newPassword:
          "The token has expired. Please request a new reset password link to regain access to your account.",
      });
    }
    setLoading(false);
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Reset Password | UMT Fellow</title>
      </Head>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Paper p={30} withBorder>
            <form onSubmit={submitHandler}>
              <Stack>
                <Text mx="auto" fw="bold">
                  Reset password
                </Text>
                <Text color="dimmed" size="xs" align="center">
                  Enter new password and repeat it
                </Text>
                <PasswordInput
                  required
                  label="New password"
                  icon={<IconLock size={14} />}
                  placeholder="New password"
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  required
                  label="Repeat password"
                  icon={<IconLock size={14} />}
                  placeholder="Repeat password"
                  {...form.getInputProps("repeatPassword")}
                />

                <Button fullWidth type="submit" mt="md" loading={loading}>
                  Save
                </Button>
              </Stack>
            </form>
          </Paper>
        </Paper>
      </div>
    </>
  );
};

export default ResetPassword;
