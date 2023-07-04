import { NewPassword } from "@components/Form";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Image,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconAt, IconIdBadge, IconLock } from "@tabler/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";

type AuthScreens = "login" | "register" | "forgotPassword" | "otp";

interface AuthenticationScreenProps {
  form: UseFormReturnType<{
    name: string;
    email: string;
    password: string;
    terms: boolean;
  }>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<AuthScreens>>;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
}

const AuthenticationScreen = ({
  form,
  screen,
  setScreen,
  submitHandler,
  error,
}: AuthenticationScreenProps) => {
  return (
    <>
      <Text size="lg" weight={500}>
        {screen.charAt(0).toUpperCase() + screen.slice(1)} with
      </Text>

      <form onSubmit={submitHandler}>
        <Stack>
          {screen === "register" && (
            <TextInput
              required
              type="text"
              label="Name"
              icon={<IconIdBadge size={14} />}
              placeholder="Your username"
              {...form.getInputProps("name")}
            />
          )}

          <TextInput
            required
            label="Email"
            type="email"
            icon={<IconAt size={14} />}
            placeholder="Your email"
            {...form.getInputProps("email")}
          />

          {(screen === "login" && (
            <PasswordInput
              required
              label="Password"
              icon={<IconLock size={14} />}
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
          )) || (
            // @ts-ignore
            <NewPassword
              required
              label="Password"
              form={form}
              argName="password"
              {...form.getInputProps("password")}
            />
          )}

          {screen === "login" && (
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => setScreen("forgotPassword")}
              size="xs"
              sx={{ alignSelf: "flex-start" }}
            >
              Forgot password?
            </Anchor>
          )}
        </Stack>

        <Stack mt="xl">
          <Button type="submit">
            {screen.charAt(0).toUpperCase() + screen.slice(1)}
          </Button>
        </Stack>

        {error && (
          <>
            <Space h="md" />
            <Text color="red">{error}</Text>
          </>
        )}

        {screen === "register" && (
          <>
            <Space h="md" />
            <Text size="xs" color="dimmed">
              By clicking Register, you agree to our{" "}
              <Link href="/terms-and-conditions" passHref>
                <Anchor>Terms and Condition</Anchor>
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" passHref>
                <Anchor>Privacy Policy</Anchor>
              </Link>
              .
            </Text>
          </>
        )}
      </form>

      <Divider label="Or continue with" labelPosition="center" my="lg" />

      <Group grow mb="md" mt="md" spacing="xl">
        <Tooltip
          transitionProps={{ transition: "pop", duration: 300 }}
          label="Google"
          position="bottom"
          withArrow
        >
          <Button
            sx={{ width: 80, height: 80 }}
            variant="default"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
          >
            <Image
              src={
                "https://ik.imagekit.io/umtfellow/Google.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673374698849"
              }
              alt="Google"
              width={20}
              height={20}
            />
            <Text ml={10}>Continue with Google</Text>
          </Button>
        </Tooltip>
      </Group>

      <Anchor
        component="button"
        type="button"
        color="dimmed"
        onClick={() =>
          setScreen(
            screen === "register"
              ? "login"
              : ((screen === "login" && "register") as AuthScreens)
          )
        }
        size="xs"
      >
        {screen === "register"
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Anchor>
    </>
  );
};

export default AuthenticationScreen;
