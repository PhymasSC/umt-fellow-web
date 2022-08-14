import { upperFirst } from "@mantine/hooks";
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
	Tooltip,
	ActionIcon,
	Grid,
} from "@mantine/core";
import {
	IconIdBadge,
	IconAt,
	IconLock,
	IconArrowLeft,
	IconKey,
} from "@tabler/icons";
import { useState } from "react";

const Authentication = (props: PaperProps) => {
	const [screen, setScreen] = useState("login");
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
			{screen === "forgot password" ? (
				<>
					<Grid justify="center">
						<ActionIcon onClick={() => setScreen("login")}>
							<IconArrowLeft />
						</ActionIcon>
						<IconKey />
					</Grid>
					<Button>Return to Login</Button>
				</>
			) : (
				<>
					<Text size="lg" weight={500}>
						{upperFirst(screen)} with
					</Text>

					<form onSubmit={form.onSubmit(() => {})}>
						<Stack>
							{screen === "register" && (
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

							{screen === "register" ? (
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
							) : (
								<Anchor
									component="button"
									type="button"
									color="dimmed"
									onClick={() => setScreen("forgot password")}
									size="xs"
								>
									Forgot password?
								</Anchor>
							)}
						</Stack>

						<Stack mt="xl">
							<Button type="submit">{upperFirst(screen)}</Button>
						</Stack>
					</form>

					<Divider
						label="Or continue with"
						labelPosition="center"
						my="lg"
					/>

					<Group grow mb="md" mt="md" spacing="xl">
						<Tooltip
							transition="pop"
							label="Facebook"
							position="bottom"
							withArrow
						>
							<Button
								sx={{ width: 80, height: 80 }}
								variant="default"
							>
								<Image
									src="/Facebook.svg"
									alt="Facebook"
									width={40}
									height={40}
								/>
							</Button>
						</Tooltip>
						<Tooltip
							transition="pop"
							label="Google"
							position="bottom"
							withArrow
						>
							<Button
								sx={{ width: 80, height: 80 }}
								variant="default"
							>
								<Image
									src="/Google.svg"
									alt="Google"
									width={40}
									height={40}
								/>
							</Button>
						</Tooltip>
					</Group>

					<Anchor
						component="button"
						type="button"
						color="dimmed"
						onClick={() =>
							screen === "register"
								? setScreen("login")
								: setScreen("register")
						}
						size="xs"
					>
						{screen === "register"
							? "Already have an account? Login"
							: "Don't have an account? Register"}
					</Anchor>
				</>
			)}
		</Paper>
	);
};

export default Authentication;
