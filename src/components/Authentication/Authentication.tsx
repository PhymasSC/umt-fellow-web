import { useState } from "react";
import { useForm, isEmail, matches, hasLength } from "@mantine/form";
import { Paper, PaperProps } from "@mantine/core";
import { signIn } from "next-auth/react";
import { PASSWORD_PATTERN } from "@constants/regex";
import AuthenticationScreen from "./AuthenticationScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import OTPScreen from "./OTPScreen";
import { GET_USER } from "@operations/queries";
import { useLazyQuery } from "@apollo/client";

type AuthScreens = "login" | "register" | "forgotPassword" | "otp";

interface AuthProps extends PaperProps {
  isModal?: boolean;
  defaultPage?: AuthScreens;
}

const Authentication = ({
  isModal = false,
  defaultPage = "login",
  ...props
}: AuthProps) => {
  const [screen, setScreen] = useState<AuthScreens>(defaultPage);
  const [error, setError] = useState("");
  const [getUser] = useLazyQuery(GET_USER(""));

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      name: hasLength({ min: 3, max: 60 }, "Invalid username"),
      email: isEmail("Invalid email"),
      password: matches(
        PASSWORD_PATTERN,
        "Password should include at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (screen === "login") {
      // Ignore username validation
      if (hasErrors && (errors.email || errors.password)) {
        return;
      }

      // Perform login with graphql query
      signIn("credentials", {
        email: form.values.email,
        password: form.values.password,
        callbackUrl: "/",
        // redirect: false,
      });
    } else if (screen === "register") {
      if (hasErrors) {
        return;
      }

      const isUserExist = await getUser({
        variables: {
          email: form.values.email,
        },
      });
      if (isUserExist.data !== null) {
        form.setFieldError(
          "email",
          "Email already registered. Please login instead."
        );
        return;
      }
      setScreen("otp");
    }
  };

  const resetPasswordScreen = (
    <ResetPasswordScreen form={form} setScreen={setScreen} />
  );

  const authenticationScreen = (
    <AuthenticationScreen
      form={form}
      screen={screen}
      setScreen={setScreen}
      submitHandler={submitHandler}
      error={error}
    />
  );

  const OTP = (
    <OTPScreen
      name={form.values.name}
      email={form.values.email}
      password={form.values.password}
    />
  );

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      {screen === "forgotPassword"
        ? resetPasswordScreen
        : screen === "otp"
        ? OTP
        : authenticationScreen}
    </Paper>
  );
};

export default Authentication;
