import { useMutation } from "@apollo/client";
import { Flex, PinInput, Text } from "@mantine/core";
import { ADD_USER } from "@operations/mutations";
import dayjs from "dayjs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type OTPScreenProps = {
  name: string;
  email: string;
  password: string;
};

const OTPScreen = (props: OTPScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeout, setTimeout] = useState<Date>();
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(false);
  const [register] = useMutation(ADD_USER);
  const router = useRouter();

  const getOTP = async () => {
    setIsExpired(false);
    const res = await fetch("/api/otp", {
      method: "POST",
    });
    const { token } = await res.json();
    setOtp(token);
    setTimeout(new Date(Date.now() + 600000)); // 10 minutes
    const sendmail = await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        emailType: "OTP",
        data: {
          username: props.name,
          otp: token.split(""),
        },
      }),
    });
    console.log(sendmail);
  };

  useEffect(() => {
    getOTP();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = dayjs(timeout).diff(dayjs(), "second");
      if (remainingTime <= 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
      const newTimeout = new Date(timeout?.getTime() || "");
      newTimeout.setSeconds(newTimeout.getSeconds() - 1);
      setTimeout(newTimeout);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeout]);

  return (
    <Flex direction="column" align="center" justify="center" gap="lg">
      <Text fw="bold" size="sm">
        Enter the OTP sent to your email to verify your identity:
      </Text>
      <PinInput
        length={6}
        size="lg"
        type="number"
        oneTimeCode
        placeholder=""
        disabled={loading}
        error={error}
        onChange={() => {
          setError(false);
        }}
        onComplete={async (res) => {
          setLoading(true);
          if (res === otp && !isExpired) {
            const response = await register({
              variables: {
                name: props.name,
                email: props.email,
                password: props.password,
              },
            });
            console.log(response);
            if (response.data.addUser.code === 200) {
              const res = await signIn("credentials", {
                email: props.email,
                password: props.password,
                callbackUrl: "/",
                // redirect: false,
              });
              console.log(res);
            } else {
              router.push({
                pathname: "/auth/register",
                query: {
                  error: "OAuthAccountNotLinked",
                },
              });
            }
          } else {
            setError(true);
          }
          setLoading(false);
        }}
      />

      {!isExpired ? (
        <>
          <Text
            size="xs"
            c="dimmed"
            component="a"
            onClick={getOTP}
            align="left"
          >
            Didn&apos;t receive the OTP? Click here to request a new one ↻.
          </Text>
          <Text size="xs" c="dimmed">
            Your OTP will expire in{" "}
            {dayjs(timeout).diff(dayjs(), "minute") >= 1 &&
              `${dayjs(timeout).diff(dayjs(), "minute")} minutes and `}{" "}
            {dayjs(timeout).diff(dayjs(), "second") % 60} seconds. Please enter
            it before it expires.
          </Text>
        </>
      ) : (
        <Text size="xs" c="dimmed" component="a" onClick={getOTP}>
          Your OTP has expired! Click here to request a new one ↻.
        </Text>
      )}
    </Flex>
  );
};

export default OTPScreen;
