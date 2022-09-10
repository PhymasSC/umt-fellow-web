import {
	useMantineColorScheme,
	ActionIcon,
	Group,
	MantineTheme,
} from "@mantine/core";
import { PRIMARY_COLOR } from "@constants/colors";
import { IconSun, IconMoon } from "@tabler/icons";
import { FC } from "react";

interface ThemeTogglerProps {
	className?: string;
}

const ThemeToggler: FC<ThemeTogglerProps> = (props) => {
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
							? theme.colors[PRIMARY_COLOR][4]
							: theme.colors[PRIMARY_COLOR][6],
				})}
			>
				{colorScheme === "dark" ? (
					<IconSun size={18} />
				) : (
					<IconMoon size={18} />
				)}
			</ActionIcon>
		</Group>
	);
};

export default ThemeToggler;
