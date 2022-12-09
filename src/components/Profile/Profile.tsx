import Footer from "@components/Footer";
import {
	createStyles,
	Card,
	Avatar,
	Text,
	Grid,
	Container,
	Title,
	Stack,
	Button,
	Space,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
	IconBrandTwitter,
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandTiktok,
	IconBrandInstagram,
	IconBrandSnapchat,
	IconUserPlus,
	IconBrandTelegram,
	IconBrandDribbble,
	IconBrandReddit,
	IconBrandYoutube,
} from "@tabler/icons";

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
	id: string;
	image: string;
	avatar?: string;
	name: string;
	nickname?: string | string[];
	stats: { label: string; value: string }[];
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
	const { id, image, name } = props;
	const { classes } = useStyles();
	const { width } = useViewportSize();

	return (
		<Container fluid>
			<Card className={classes.card}>
				<Card.Section
					sx={{
						backgroundImage: `url(${image?.toString()})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "40vh",
					}}
					className={classes.cover}
				/>
				<Avatar src={image?.toString()} className={classes.avatar} />
				<Card.Section
					mt="lg"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Stack spacing={10}>
						<Title align="center" order={1}>
							{name}
						</Title>

						<Text align="center" size="sm" color="dimmed">
							@{id}
						</Text>

						<Button
							variant="light"
							color="cyan"
							leftIcon={<IconUserPlus size={15} />}
						>
							Follow
						</Button>
					</Stack>
				</Card.Section>

				<Container m="xl" fluid>
					<Grid>
						<Grid.Col md={12} lg={4}>
							<Stack>
								<Card sx={{ padding: "2em !important" }}>
									<Title size={20}>Biography</Title>
									{/* {stats.map((stat) => (
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
									))} */}
								</Card>
								<Card sx={{ padding: "2em !important" }}>
									<Title size={20}>Follow me on</Title>
									<Space h={30} />
									<Container>
										<Stack spacing={30}>
											<IconBrandFacebook />
											<IconBrandInstagram />
											<IconBrandTwitter />
											<IconBrandSnapchat />
											<IconBrandTiktok />
											<IconBrandTelegram />
											<IconBrandReddit />
											<IconBrandYoutube />
											<IconBrandGithub />
											<IconBrandDribbble />
										</Stack>
									</Container>
								</Card>
								{width >= 1200 && <Footer />}
							</Stack>
						</Grid.Col>
						<Grid.Col md={12} lg={8}>
							<Card radius="md">POSTS</Card>
							{width < 1200 && (
								<>
									<Space h={20}></Space>
									<Footer />
								</>
							)}
						</Grid.Col>
					</Grid>
				</Container>
			</Card>
		</Container>
	);
};

export default Profile;
