import { Card } from "@mantine/core";
import SingleFeed from "./SingleFeed";
const data = [
	{
		username: "Lau Sheng Cher",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "3 Minutes ago",
		content: "Test",
	},
	{
		username: "James",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "1 Hour ago",
		content: "blah blah blah",
	},
	{
		username: "Tom",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "1 Hour ago",
		content: "love this",
	},
	{
		username: "Alice",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "2 Hour ago",
		content:
			"This is a really really long string that is going to be truncated and then it will be truncated again and again non stop until it is truncated to the point where it is not truncated anymore. This string is long enough to be truncated at some point, but not now, still making it long enough to be truncated! Almost to be truncated, its time to be truncated",
	},
	{
		username: "Kobe",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "2 hour ago",
		content:
			"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
	},
];

const Feed = () => {
	return (
		<Card shadow="sm" p={0} radius="md" withBorder>
			{data.map((item, index) => (
				<Card.Section key={index} withBorder>
					<SingleFeed key={index} {...item} />
				</Card.Section>
			))}
		</Card>
	);
};

export default Feed;
