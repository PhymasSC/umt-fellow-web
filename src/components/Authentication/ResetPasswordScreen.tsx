import { Stack, Text, TextInput, Group, Button, Center } from "@mantine/core";
import { IconArrowLeft, IconAt } from "@tabler/icons";
import { useForm, UseFormReturnType } from "@mantine/form";

type AuthScreens = 'login' | 'register' | 'forgotPassword';

interface ResetPasswordScreenProps {
    form: UseFormReturnType<{ name: string; email: string; password: string; terms: boolean; }>;
    setScreen: React.Dispatch<React.SetStateAction<AuthScreens>>;
}

const ResetPasswordScreen = ({ form, setScreen }: ResetPasswordScreenProps) => {
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
                {...form.getInputProps("email")}
            />
            <Group position="apart">
                <Center inline>
                    <Button
                        component="button"
                        onClick={() => {
                            setScreen("login");
                        }}
                        p="sm"
                        size="sm"
                        color="dimmed"
                    >
                        <Group>
                            <IconArrowLeft size={16} stroke={1.5} />
                            <Text>Back to login page</Text>
                        </Group>
                    </Button>
                </Center>
                <Button type="submit">Send </Button>
            </Group>
        </Stack>
    );
};

export default ResetPasswordScreen;
