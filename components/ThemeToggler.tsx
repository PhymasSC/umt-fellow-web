import {
	useMantineColorScheme,
	ActionIcon,
	Group,
	MantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import React from "react";

type Props = {
	className?: string;
};

const ThemeToggler: React.FC<Props> = (props) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Group position="center" my="xl" {...props}>
			<ActionIcon
				onClick={() => toggleColorScheme()}
				size="lg"
				sx={(theme: MantineTheme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[0],
					color:
						theme.colorScheme === "dark"
							? theme.colors.orange[4]
							: theme.colors.orange[6],
				})}
			>
				{colorScheme === "dark" ? (
					<IconSun size={18} />
				) : (
					<IconMoonStars size={18} />
				)}
			</ActionIcon>
		</Group>
	);
};

export default ThemeToggler;
