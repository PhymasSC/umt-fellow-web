import { createStyles, Card, Avatar, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		borderRadius: 0,
		backgroundColor: "transparent",
	},

	avatar: {
		borderRadius: "999em",
		border: `${theme.fn.smallerThan("sm") ? ".2em" : ".5em"} solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[8]
				: theme.colors.blue[0]
		}`,
		width: "10em",
		height: "10em",
		margin: "-5em auto 0 auto",
	},
}));

interface ProfileProps {
	image?: string;
	avatar?: string;
	name: string;
	nickname?: string | string[];
	stats: { label: string; value: string }[];
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
	const { image, avatar, name, nickname, stats } = props;
	const { classes, theme } = useStyles();

	const items = stats.map((stat) => (
		<div key={stat.label}>
			<Text align="center" size="lg" weight={500}>
				{stat.value}
			</Text>
			<Text align="center" size="sm" color="dimmed">
				{stat.label}
			</Text>
		</div>
	));

	return (
		<Card className={classes.card}>
			<Card.Section
				sx={{
					backgroundImage: `url(${image})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "40vh",
				}}
			/>
			<Avatar src={avatar} className={classes.avatar} />
			<Card.Section mt="lg">
				<Text align="center" size="xl" weight={700}>
					{name}
				</Text>
				<Text align="center" size="sm" color="dimmed">
					@{nickname}
				</Text>
			</Card.Section>

			<Card>
				<Card.Section></Card.Section>
			</Card>
		</Card>
	);
};

export default Profile;
