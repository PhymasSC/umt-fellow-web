// @ts-nocheck
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
	Anchor,
	Stack,
	Image,
	Tooltip,
	Space,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { IconIdBadge, IconAt, IconLock, IconArrowLeft } from "@tabler/icons";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@operations/queries";
import { ADD_USER } from "@operations/mutations";
import Link from "next/link";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@constants/regex";
import router from "next/router";

interface AuthProps extends PaperProps {
	isModal?: boolean;
	defaultPage?: string;
}

const Authentication = (props: AuthProps) => {
	const { isModal = false, defaultPage = "login" } = props;
	const [screen, setScreen] = useState(defaultPage);
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
			name: (value) =>
				(value.trim().length < 3 || value.trim().length > 190) &&
				"Invalid username",
			email: (val) => !EMAIL_PATTERN.test(val) && "Invalid email",
			password: (val) =>
				!PASSWORD_PATTERN.test(val) &&
				"Password should include at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
		},
	});
	const submitHandler = async (e: { preventDefault: () => void }) => {
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

			const response = await register({
				variables: {
					name: form.values.name,
					email: form.values.email,
					password: form.values.password,
				},
			});

			if (response.data.addUser.code == 200) {
				signIn("credentials", {
					email: form.values.email,
					password: form.values.password,
					callbackUrl: "/",
					// redirect: false,
				});
			} else {
				setError(response.data.addUser.code);
				form.setErrors({ email: "Email has been registered" });
			}
		}
	};

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			{screen === "forgot password" ? (
				<>
					<Group position="center">
						<Paper
							sx={{
								position: "absolute",
								left: "2.75em",
								top: "2.75em",
								cursor: "pointer",
							}}
							onClick={() => setScreen("login")}
						>
							<IconArrowLeft />
						</Paper>
						<Text>Reset password</Text>
					</Group>
					<Space h="md" />
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
						{...form.getInputProps("email")}
					/>
					<Stack mt="xl">
						<Button type="submit">Send </Button>
					</Stack>
				</>
			) : (
				<>
					<Text size="lg" weight={500}>
						{upperFirst(screen)} with
					</Text>

					{/* <form onSubmit={form.onSubmit(submitHandler)}> */}
					<form onSubmit={submitHandler}>
						<Stack>
							{screen === "register" && (
								<TextInput
									required
									label="name"
									icon={<IconIdBadge size={14} />}
									placeholder="Your username"
									value={form.values.name}
									onChange={(event) =>
										form.setFieldValue(
											"name",
											event.currentTarget.value
										)
									}
									{...form.getInputProps("name")}
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
								{...form.getInputProps("email")}
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
								{...form.getInputProps("password")}
							/>

							{screen === "login" && (
								<Anchor
									component="button"
									type="button"
									color="dimmed"
									onClick={() => setScreen("forgot password")}
									size="xs"
									sx={{ alignSelf: "flex-start" }}
								>
									Forgot password?
								</Anchor>
							)}
						</Stack>

						<Stack mt="xl">
							<Button type="submit">{upperFirst(screen)}</Button>
						</Stack>

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
								onClick={() => {
									signIn("facebook", { callbackUrl: "/" });
								}}
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
								onClick={() => {
									signIn("google", { callbackUrl: "/" });
								}}
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
							screen === "register" && isModal
								? setScreen("login")
								: screen === "login" && isModal
								? setScreen("register")
								: screen === "register" && !isModal
								? router.push("/login")
								: router.push("/register")
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
