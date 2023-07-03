import { Stack, Text, TextInput, Group, Button, Loader } from "@mantine/core";
import { IconArrowLeft, IconAt, IconMailFast, IconSend } from "@tabler/icons";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";

type AuthScreens = "login" | "register" | "forgotPassword" | "otp";

interface ResetPasswordScreenProps {
  form: UseFormReturnType<{
    name: string;
    email: string;
    password: string;
    terms: boolean;
  }>;
  setScreen: React.Dispatch<React.SetStateAction<AuthScreens>>;
}

const ResetPasswordScreen = ({ form, setScreen }: ResetPasswordScreenProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (hasErrors && errors.email) {
      return;
    }

    setLoading(true);

    const response: {
      token: string;
      email: string;
      expires: string;
      err?: string;
    } = await (
      await fetch("/api/reset-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.values.email }),
      })
    ).json();

    if (response.err === "social") {
      setLoading(false);
      form.setFieldError(
        "email",
        "This email is associated with a social account. Please login with google."
      );
      return;
    } else if (response.err === "no-account") {
      setLoading(false);
      form.setFieldError(
        "email",
        "This email is not associated with any account. Please register."
      );
      return;
    }
    const reset_url = `${
      process.env.NODE_ENV === "production"
        ? "https://www.umtfellow.social/"
        : "http://localhost:3000/"
    }reset-password?token=${encodeURIComponent(response.token)}`;

    const mailResponse = await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.values.email,
        emailType: "FORGOT_PASSWORD",
        data: { reset_url },
      }),
    });
    setLoading(false);
    setMessage("Reset link has been sent to your email");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <Stack>
      <Text mx="auto" weight={500}>
        Reset password
      </Text>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>
      <TextInput
        required
        label="Email"
        icon={<IconAt size={14} />}
        placeholder="Your email"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler(e);
          }
        }}
        rightSection={
          loading ? (
            <Loader size="xs" />
          ) : (
            <IconSend size={14} onClick={submitHandler} cursor="pointer" />
          )
        }
        {...form.getInputProps("email")}
      />
      {message && (
        <Text color="green" size="xs">
          <Group spacing="xs">
            {message}
            <IconMailFast stroke={1} size={18} />
          </Group>
        </Text>
      )}

      <Button
        component="button"
        leftIcon={<IconArrowLeft size={14} />}
        onClick={() => {
          setScreen("login");
        }}
        variant="default"
        color="dark"
      >
        Back to login page
      </Button>
    </Stack>
  );
};

export default ResetPasswordScreen;
