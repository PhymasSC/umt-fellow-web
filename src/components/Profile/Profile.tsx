import {
	createStyles,
	Card,
	Avatar,
	Text,
	Grid,
	SimpleGrid,
	Skeleton,
	Container,
	Title,
} from "@mantine/core";

const PRIMARY_COL_HEIGHT = 300;

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: "transparent",
	},

	cover: {
		borderRadius: "0.5em",
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

	stats: {
		width: "40%",
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
	const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

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
		<Container fluid>
			<Card className={classes.card}>
				<Card.Section
					sx={{
						backgroundImage: `url(${image})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "40vh",
					}}
					className={classes.cover}
				/>
				<Avatar src={avatar} className={classes.avatar} />
				<Card.Section mt="lg">
					<Title align="center" order={1}>
						{name}
					</Title>

					<Text align="center" size="sm" color="dimmed">
						@{nickname}
					</Text>
				</Card.Section>

				<Container m="xl" fluid>
					<SimpleGrid
						cols={2}
						spacing="md"
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
					>
						<Grid gutter="md">
							<Grid.Col>
								<Card radius="md">
									{stats.map((stat) => (
										<div
											key={stat.label}
											style={{
												display: "flex",
												alignItems: "center",
												gap: "1em",
												marginBottom: theme.spacing.md,
											}}
										>
											<Text
												size="xl"
												weight={500}
												mt="md"
											>
												{stat.label}
											</Text>
											<Text
												size="md"
												color="dimmed"
												mt="sm"
											>
												{stat.value}
											</Text>
										</div>
									))}
								</Card>
							</Grid.Col>
							<Grid.Col span={6}>
								<Card radius="md">3</Card>
							</Grid.Col>
							<Grid.Col span={6}>
								<Card radius="md">4</Card>
							</Grid.Col>
						</Grid>
						<Card radius="md">123</Card>
					</SimpleGrid>
				</Container>
				<Card className={classes.stats}>
					<Card.Section>
						{items.map((item) => (
							<div
								key={item.key}
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: theme.spacing.md,
								}}
							>
								{item}
							</div>
						))}
					</Card.Section>
				</Card>
			</Card>
		</Container>
	);
};

export default Profile;
