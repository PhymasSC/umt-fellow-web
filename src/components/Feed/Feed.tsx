import { Card, Container } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import { useStyles } from "./Feed.style";

const data = [
	{
		title: "test",
		username: "Lau Sheng Cher",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "3 Minutes ago",
		content: "Test",
		voteCount: "1.1k",
		badges: [
			{ value: "Moderator", color: "yellow" },
			{ value: "Founder", color: "teal" },
		],
		image: "https://placeimg.com/192/192/people",
	},
	{
		title: "test",
		username: "James",
		profilePic: "https://placeimg.com/195/192/people",
		createdTime: "1 Hour ago",
		content: "blah blah blah",
		voteCount: "1.1k",
		image: "https://placeimg.com/192/192/people",
		badges: [],
	},
	{
		title: "test",
		username: "Tom",
		profilePic: "https://placeimg.com/194/192/people",
		createdTime: "1 Hour ago",
		content: "love this",
		voteCount: "1.1k",
		image: "https://placeimg.com/192/192/people",
		badges: [],
	},
	{
		title: "test",
		username: "Alice",
		profilePic: "https://placeimg.com/193/192/people",
		createdTime: "2 Hour ago",
		content:
			"This is a really really long string that is going to be truncated and then it will be truncated again and again non stop until it is truncated to the point where it is not truncated anymore. This string is long enough to be truncated at some point, but not now, still making it long enough to be truncated! Almost to be truncated, its time to be truncated",
		voteCount: "1.1k",
		image: "https://placeimg.com/192/192/people",
		badges: [],
	},
	{
		title: "test",
		username: "Kobe",
		profilePic: "https://placeimg.com/300/192/people",
		createdTime: "2 hour ago",
		content:
			"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
		voteCount: "91.1k",
		image: "https://placeimg.com/192/192/people",
		badges: [],
	},
];

const Feed = () => {
	const { classes } = useStyles();
	return (
		<Container className={classes.container}>
			<Card p={0} radius="md" withBorder>
				{data.map((item, index) => (
					<Card.Section key={index} withBorder>
						<SingleFeed key={index} {...item} />
					</Card.Section>
				))}
			</Card>
		</Container>
	);
};

export default Feed;
