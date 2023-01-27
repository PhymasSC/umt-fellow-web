import {
	Stack,
	TextInput,
	Grid,
	Button,
	PasswordInput,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { useSession } from "next-auth/react";
import SettingLayout from "./SettingLayout";

const AccountSetting = () => {
	const { data: session } = useSession();
	const configuration = [
		{
			label: "Display Name",
			description:
				"The name displayed on your profile and @mention by other users",
			input: (
				<TextInput
					mt="-1em"
					mb="1em"
					type="text"
					placeholder={session?.user.name || ""}
				></TextInput>
			),
		},
		{
			label: "Email Address",
			description:
				"Update the email address associated with your account",
			input: (
				<TextInput
					mt="-1em"
					mb="1em"
					type="email"
					placeholder={session?.user.email || ""}
				></TextInput>
			),
		},
		{
			label: "Password",
			description: "Change the password used to log in to your account.",
			input: <PasswordInput />,
		},
		{
			label: "Delete Account",
			description:
				"Permanently delete your account and all associated data",
			input: (
				<Button color="red" leftIcon={<IconTrash />}>
					Delete Account
				</Button>
			),
		},
	];
	return (
		<Stack>
			<Grid>
				<Grid.Col span={6}>
					<SettingLayout
						layout="vertical"
						label={configuration[0].label}
						description={configuration[0].description}
						input={configuration[0].input}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<SettingLayout
						layout="vertical"
						label={configuration[1].label}
						description={configuration[1].description}
						input={configuration[1].input}
					/>
				</Grid.Col>
			</Grid>
			<SettingLayout
				layout="vertical"
				label={configuration[2].label}
				description={configuration[2].description}
				input={configuration[2].input}
			/>
			<SettingLayout
				layout="horizontal"
				label={configuration[3].label}
				description={configuration[3].description}
				input={configuration[3].input}
			/>
		</Stack>
	);
};

export default AccountSetting;
