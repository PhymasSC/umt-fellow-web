import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
  PasswordInputProps,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRef } from "react";

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
};

const requirements = [
  { re: /^.{8,}$/, label: "Has at least 8 characters" },
  { re: /[0-9]/, label: "Includes numberic digit" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: "Includes special symbol",
  },
  { re: /^\S*$/, label: "No whitespace" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
};

type NewPasswordProps = PasswordInputProps & {
  form: any;
  argName: string;
};

const NewPassword = (props: NewPasswordProps) => {
  const { form, argName } = props;
  const ref = useRef<HTMLInputElement>(null);
  const strength = getStrength(form.values[argName]);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values[argName])}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          form.values[argName].length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        ref={ref}
        placeholder="Password"
        label="Password"
        required
        {...props}
      />

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      {checks}
    </div>
  );
};

export default NewPassword;
