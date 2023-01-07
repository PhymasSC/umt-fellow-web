import { Card, Container, Box } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import { useStyles } from "./Feed.style";
import Link from "next/link";
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
	slug: string;
}

const Feed = (props: FeedProps) => {
	const { feeds } = props;
	const { classes } = useStyles();
	return (
		<Card p={0} radius="md" withBorder>
			{feeds &&
				feeds.map((item, index) => (
					<Link
						key={`${index}_${item.slug}`}
						href={`/thread/${item.slug}`}
						passHref
					>
						<Card.Section key={index} withBorder>
							<SingleFeed key={index} {...item} />
						</Card.Section>
					</Link>
				))}
		</Card>
	);
};

export default Feed;
