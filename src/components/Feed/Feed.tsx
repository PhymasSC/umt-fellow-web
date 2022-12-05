import { Card, Container } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import { useStyles } from "./Feed.style";

interface FeedProps {
	feeds?: feed[];
}
interface feed {
	title: string;
	username: string;
	profilePic: string;
	createdTime: string;
	content: string;
	voteCount: number;
	badges: {
		value: string;
		color: string;
	}[];
	image: string;
}

const Feed = (props: FeedProps) => {
	const { feeds }= props;
	const { classes } = useStyles();
	return (
		<Container className={classes.container}>
			<Card p={0} radius="md" withBorder>
				{feeds && feeds.map((item, index) => (
					<Card.Section key={index} withBorder>
						<SingleFeed key={index} {...item} />
					</Card.Section>
				))}
			</Card>
		</Container>
	);
};

export default Feed;
