import { Feed } from "@components/index";
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
	Group,
	Badge,
	Image,
	BackgroundImage,
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
	IconCircleCheck,
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
	user: {
		id: string;
		image: string;
		avatar?: string;
		name: string;
		nickname?: string | string[];
		isUMTMembership: boolean;
		stats: { label: string; value: string }[];
	};
	threads: any;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
	const { user, threads } = props;
	console.log(threads);
	const { classes } = useStyles();
	const { width } = useViewportSize();
	return (
		<Container fluid>
			<Card className={classes.card}>
				<BackgroundImage src={user.image.replace(/\s+/g, "%20")} radius="sm">
					<Card.Section
						sx={{
							height: "40vh",
						}}
						className={classes.cover}
					></Card.Section>
				</BackgroundImage>
				<Avatar
					src={user.image.replace(/\s+/g, "%20")}
					className={classes.avatar}
				/>
				<Card.Section
					mt="lg"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Stack spacing={10}>
						<Group spacing={10}>
							<Title order={1}>{user.name}</Title>
							{user.isUMTMembership && (
								<Badge color="blue" size="xl">
									<Group
										spacing={6}
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<IconCircleCheck size={18} />
										Verified
									</Group>
								</Badge>
							)}
						</Group>

						<Text align="center" size="sm" color="dimmed">
							@{user.id}
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
							<Card radius="md">
								<Feed feeds={threads}></Feed>
							</Card>
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
