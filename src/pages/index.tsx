import { Feed } from "@components/index";
import type { NextPage } from "next";

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
	},
];

const Home: NextPage = () => {
	return (
		<>
			<Feed feeds={data}/>
		</>
	);
};

export default Home;
