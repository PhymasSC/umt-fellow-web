import { Card, Container, Box } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import { useStyles } from "./Feed.style";
import Link from "next/link";
import { PRIMARY_COLOR } from "@constants/colors";
interface FeedProps {
	feeds: { threads: feed[] };
}

interface feed {
	title: string;
	author: {
		id: string;
		name: string;
		image: string;
	};
	images: string[];
	createdAt: string;
	description: string;
	id: string;
}
// interface feed {
// 	title: string;
// 	username: string;
// 	profilePic: string;
// 	createdTime: string;
// 	content: string;
// 	voteCount: number;
// 	badges: {
// 		value: string;
// 		color: string;
// 	}[];
// 	image: string;
// 	slug: string;
// }

const Feed = (props: FeedProps) => {
	const { feeds } = props;
	const { classes } = useStyles();
	Object.entries(feeds || {}).map(([key, value]) => {
		value?.map((item) => {
			console.log(item);
		});
	});
	return (
		<Card p={0} radius="md" withBorder>
			{Object.entries(feeds || {}).map(([key, value]) =>
				value.map((item, index) => (
					<Link key={item.id} href={`/thread/${item.id}`} passHref>
						{index === 0 || index === value.length - 1 ? (
							<Card.Section
								sx={(theme) => ({
									textDecoration: "none",
									color:
										theme.colorScheme === "dark"
											? theme.colors.gray[0]
											: theme.colors.dark[9],

									"&:hover": {
										cursor: "pointer",
										backgroundColor:
											theme.colorScheme === "dark"
												? theme.colors.dark[7]
												: theme.colors.gray[0],
									},
								})}
								component="a"
							>
								<SingleFeed key={index} {...item} />
							</Card.Section>
						) : (
							<Card.Section
								sx={(theme) => ({
									textDecoration: "none",
									color:
										theme.colorScheme === "dark"
											? theme.colors.gray[0]
											: theme.colors.dark[9],

									"&:hover": {
										cursor: "pointer",
										backgroundColor:
											theme.colorScheme === "dark"
												? theme.colors.dark[7]
												: theme.colors.gray[0],
									},
								})}
								component="a"
								key={index}
								withBorder
							>
								<SingleFeed key={index} {...item} />
							</Card.Section>
						)}
					</Link>
				))
			)}
			{/* {Object.entries(feeds || {}).map((key: string, value: feed[]) =>
				value?.map((item) => {
					<Link
						key={`${index}_${item.id}`}
						href={`/thread/${item.id}`}
						passHref
					>
						<Card.Section
							sx={(theme) => ({
								textDecoration: "none",
								color:
									theme.colorScheme === "dark"
										? theme.colors.gray[0]
										: theme.colors.dark[9],
							})}
							component="a"
							key={index}
							withBorder
						>
							<SingleFeed key={index} {...item} />
						</Card.Section>
					</Link>;
				})
			)} */}
		</Card>
	);
};

export default Feed;
