import {
	useMantineColorScheme,
	Group,
	Switch,
	useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { FC } from "react";

interface ThemeTogglerProps {
	className?: string;
	compact?: boolean;
}

const ThemeToggler: FC<ThemeTogglerProps> = (props) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
	if (!props.compact) {
		return (
			<Group position="center" my={30} {...props}>
				<Switch
					checked={colorScheme === "dark"}
					onChange={() => toggleColorScheme()}
					size="lg"
					onLabel={
						<IconSun color={theme.white} size={20} stroke={1.5} />
					}
					offLabel={
						<IconMoonStars
							color={theme.colors.gray[6]}
							size={20}
							stroke={1.5}
						/>
					}
				/>
			</Group>
		);
	} else {
		return <div onClick={() => toggleColorScheme()}>Switch Theme</div>;
	}
};

export default ThemeToggler;
