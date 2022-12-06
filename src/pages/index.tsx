import { Feed, Typography } from "@components/index";
import {
	Card,
	Container,
	Grid,
	Group,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { Footer } from "@components/index";
import { IconAlertCircle, IconTestPipe2 } from "@tabler/icons";
import type { NextPage } from "next";
import Link from "next/link";

const data = [
	{
		title: "test",
		username: "Lau Sheng Cher",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "3 Minutes ago",
		content: "Test",
		voteCount: 738,
		badges: [
			{ value: "Moderator", color: "yellow" },
			{ value: "Founder", color: "teal" },
		],
		image: "https://placeimg.com/192/192/people",
		slug: "0",
	},
	{
		title: "test",
		username: "James",
		profilePic: "https://placeimg.com/195/192/people",
		createdTime: "1 Hour ago",
		content: "blah blah blah",
		voteCount: 500,
		image: "https://placeimg.com/192/192/people",
		badges: [],
		slug: "1",
	},
	{
		title: "test",
		username: "Tom",
		profilePic: "https://placeimg.com/194/192/people",
		createdTime: "1 Hour ago",
		content: "love this",
		voteCount: 1470,
		image: "https://placeimg.com/192/192/people",
		badges: [],
		slug: "2",
	},
	{
		title: "test",
		username: "Alice",
		profilePic: "https://placeimg.com/193/192/people",
		createdTime: "2 Hour ago",
		content:
			"This is a really really long string that is going to be truncated and then it will be truncated again and again non stop until it is truncated to the point where it is not truncated anymore. This string is long enough to be truncated at some point, but not now, still making it long enough to be truncated! Almost to be truncated, its time to be truncated",
		voteCount: 1150,
		image: "https://placeimg.com/192/192/people",
		badges: [],
		slug: "3",
	},
	{
		title: "test",
		username: "Kobe",
		profilePic: "https://placeimg.com/300/192/people",
		createdTime: "2 hour ago",
		content:
			"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
		voteCount: 2974891,
		image: "https://placeimg.com/192/192/people",
		badges: [],
		slug: "4",
	},
];

const Home: NextPage = () => {
	return (
		<>
			<Container
				m="xl"
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
				fluid
			>
				<Grid>
					<Grid.Col md={12} lg={8}>
						<Feed feeds={data} />
					</Grid.Col>
					<Grid.Col md={12} lg={4}>
						<Container>
							<Card
								sx={(theme) => ({
									display: "flex",
									alignItems: "center",
									backgroundColor: theme.colors.yellow[1],
									border: `1px solid`,
									borderColor: theme.colors.yellow[5],
									minHeight: "8em",
									paddingLeft: "2em !important",
								})}
							>
								<Text
									sx={(theme) => ({
										color: theme.colors.yellow[9],
									})}
								>
									<Group>
										<IconTestPipe2 />
										<Title order={3}>Beta</Title>
									</Group>
									<Space h={5} />
									<Typography>
										<Text
											sx={(theme) => ({
												color: theme.colors.yellow[9],
											})}
											weight={500}
										>
											We are currently in beta. If you
											find any bugs, please report them{" "}
											<Link href="/contact-us">here</Link>
											.
										</Text>
									</Typography>
								</Text>
							</Card>
							<Space h={30} />
							<Footer />
						</Container>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default Home;
