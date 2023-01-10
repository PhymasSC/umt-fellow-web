import { Feed, Typography } from "@components/index";
import {
	Card,
	Container,
	Flex,
	Grid,
	Group,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { Footer, Comment } from "@components/index";
import { IconTestPipe2 } from "@tabler/icons";
import { useSession } from "next-auth/react";
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

const comment_data = {
	postedAt: "10 minutes ago",
	body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
	author: {
		name: "Jacob Warnhalter",
		image: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
	},
};
const Home: NextPage = () => {
	const { data: session } = useSession();
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
					<Container>
						<Flex mih={50} gap="md" direction="column" wrap="wrap">
							{session && (
								<Comment
									postedAt={comment_data.postedAt}
									body={comment_data.body}
									author={{
										name: session?.user?.name || "",
										image: session?.user?.image || "",
									}}
								/>
							)}
							<Feed feeds={data} />
						</Flex>
					</Container>
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
