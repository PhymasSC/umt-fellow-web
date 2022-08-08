import React, { ReactNode } from "react";
import { Modal, useMantineTheme, Title } from "@mantine/core";
import AuthenticationForm from "./Authentication";

type Props = {
	authType?: string;
	opened?: boolean;
	onClose: () => void;
};
const IAuth: React.FC<Props> = ({
	opened = false,
	onClose,
	// r stand for register, l stand for login
	authType = "r",
}) => {
	const theme = useMantineTheme();

	return (
		<>
			{authType === "r" ? (
				<Modal
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					opened={opened}
					onClose={onClose}
					closeOnEscape
					withCloseButton={false}
				>
					<AuthenticationForm />
				</Modal>
			) : (
				<Modal
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					opened={opened}
					onClose={onClose}
					closeOnEscape
					withCloseButton={false}
					title={<Title order={3}>Login</Title>}
				>
					<div>This is a Modal</div>
				</Modal>
			)}
		</>
	);
};

export default IAuth;
