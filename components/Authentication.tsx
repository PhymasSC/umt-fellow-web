import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Checkbox,
	Anchor,
	Stack,
	Image,
} from "@mantine/core";
import { IconIdBadge, IconAt, IconLock } from "@tabler/icons";

const AuthenticationForm = (props: PaperProps) => {
	const [type, toggle] = useToggle(["login", "register"]);
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 6
					? "Password should include at least 6 characters"
					: null,
		},
	});

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" weight={500}>
				Welcome to UMT Fellow, {type} with
			</Text>

			<form onSubmit={form.onSubmit(() => {})}>
				<Stack>
					{type === "register" && (
						<TextInput
							required
							label="Username"
							icon={<IconIdBadge size={14} />}
							placeholder="Your username"
							value={form.values.name}
							onChange={(event) =>
								form.setFieldValue(
									"name",
									event.currentTarget.value
								)
							}
						/>
					)}

					<TextInput
						required
						label="Email"
						icon={<IconAt size={14} />}
						placeholder="Your email"
						value={form.values.email}
						onChange={(event) =>
							form.setFieldValue(
								"email",
								event.currentTarget.value
							)
						}
						error={form.errors.email && "Invalid email"}
					/>

					<PasswordInput
						required
						label="Password"
						icon={<IconLock size={14} />}
						placeholder="Your password"
						value={form.values.password}
						onChange={(event) =>
							form.setFieldValue(
								"password",
								event.currentTarget.value
							)
						}
						error={
							form.errors.password &&
							"Password should include at least 6 characters"
						}
					/>

					{type === "register" && (
						<Checkbox
							required
							label="I accept terms and conditions"
							checked={form.values.terms}
							onChange={(event) =>
								form.setFieldValue(
									"terms",
									event.currentTarget.checked
								)
							}
						/>
					)}
				</Stack>

				<Group position="apart" mt="xl">
					<Anchor
						component="button"
						type="button"
						color="dimmed"
						onClick={() => toggle()}
						size="xs"
					>
						{type === "register"
							? "Already have an account? Login"
							: "Don't have an account? Register"}
					</Anchor>
					<Button type="submit">{upperFirst(type)}</Button>
				</Group>
			</form>

			<Divider
				label="Or continue with email"
				labelPosition="center"
				my="lg"
			/>

			<Group grow mb="md" mt="md" spacing="xl">
				<Button style={{ width: 80, height: 80 }} variant="default">
					<Image
						src="/Facebook.svg"
						alt="Facebook"
						width={40}
						height={40}
					/>
				</Button>
				<Button style={{ width: 80, height: 80 }} variant="default">
					<Image
						src="/Google.svg"
						alt="Google"
						width={40}
						height={40}
					/>
				</Button>
			</Group>
		</Paper>
	);
};

export default AuthenticationForm;
