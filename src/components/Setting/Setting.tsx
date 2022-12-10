import { createStyles, Card, Group, Switch, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	item: {
		"& + &": {
			paddingTop: theme.spacing.sm,
			marginTop: theme.spacing.sm,
			borderTop: `1px solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[4]
					: theme.colors.gray[2]
			}`,
		},
	},

	switch: {
		"& *": {
			cursor: "pointer",
		},
	},

	title: {
		lineHeight: 1,
	},
}));

interface SwitchesCardProps {
	title: string;
	description: string;
	data: {
		title: string;
		description: string;
	}[];
}

const Setting = ({ title, description, data }: SwitchesCardProps) => {
	const { classes } = useStyles();

	const items = data.map((item) => (
		<Group
			key="1"
			position="apart"
			className={classes.item}
			noWrap
			spacing="xl"
		>
			<div>
				<Text>{item.title}</Text>
				<Text size="xs" color="dimmed">
					{item.description}
				</Text>
			</div>
			<Switch
				onLabel="ON"
				offLabel="OFF"
				className={classes.switch}
				size="lg"
			/>
		</Group>
	));

	return (
		<Card withBorder radius="md" p="xl" className={classes.card}>
			<Text size="lg" className={classes.title} weight={500}>
				{title}
			</Text>
			<Text size="xs" color="dimmed" mt={3} mb="xl">
				{description}
			</Text>
			{items}
		</Card>
	);
};

export default Setting;
