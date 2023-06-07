import { useState } from "react";
import { useForm, isEmail, matches, hasLength } from "@mantine/form";
import { Paper, PaperProps } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "@operations/mutations";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@constants/regex";
import AuthenticationScreen from "./AuthenticationScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import OTPScreen from "./OTPScreen";

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
  const [register] = useMutation(ADD_USER);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      name: hasLength({ min: 3, max: 190 }, "Invalid username"),
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
      setScreen("otp");
      // const response = await register({
      //   variables: {
      //     name: form.values.name,
      //     email: form.values.email,
      //     password: form.values.password,
      //   },
      // });

      // if (response.data.addUser.code === 200) {
      //   signIn("credentials", {
      //     email: form.values.email,
      //     password: form.values.password,
      //     callbackUrl: "/",
      //     // redirect: false,
      //   });
      // } else {
      //   setError(response.data.addUser.code);
      //   form.setErrors({ email: "Email has been registered" });
      // }
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

  const OTP = <OTPScreen OTP="123456" />;

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
