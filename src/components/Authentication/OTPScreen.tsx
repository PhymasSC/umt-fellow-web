import { Flex, PinInput, Text } from "@mantine/core";
import { useState } from "react";

type OTPScreenProps = {
  OTP: string;
};

const OTPScreen = ({ OTP }: OTPScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(OTP);

  return (
    <Flex direction="column" align="center" justify="center" gap="lg">
      <Text fw="bold" size="sm">
        We have sent you an OTP to your email address. Please enter the OTP
        below to verify your identity. OTP:
      </Text>
      <PinInput
        length={6}
        size="lg"
        type="number"
        oneTimeCode
        placeholder=""
        disabled={loading}
        onComplete={(res) => {
          setLoading(true);
          if (res === otp) {
            alert("OTP is correct!");
          } else {
            alert("OTP is incorrect!");
          }
          setLoading(false);
        }}
      />

      <Text size="xs" c="dimmed" component="a" href="" align="left">
        Didn't receive the OTP? Click here to request a new one ↻.
      </Text>
      <Text size="xs" c="dimmed">
        Your OTP will be expired in **x** minutes. Please enter it below before
        it expires.
      </Text>
    </Flex>
  );
};

export default OTPScreen;
