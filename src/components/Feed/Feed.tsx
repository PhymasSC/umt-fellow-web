import { Card, Container } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import { useStyles } from "./Feed.style";
import Link from "next/link";

interface FeedProps {
	feeds: { threads: feed[] };
	loading?: boolean;
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
	updatedAt: string;
	description: string;
	id: string;
}

const Feed = (props: FeedProps) => {
	const { feeds } = props;
	const dummy = [1, 2, 3, 4, 5];
	Object.entries(feeds || {}).map(([key, value]) => {
		value?.map((item) => {
			console.log(item);
		});
	});

	if (props.loading)
		return (
			<Card p={0} radius="md" withBorder>
				{dummy.map((item, index) => (
					<Card.Section withBorder key={index}>
						<SingleFeed
							feed={{
								title: "",
								author: {
									id: "",
									name: "",
									image: "",
								},
								images: [],
								createdAt: "",
								updatedAt: "",
								description: "",
								id: "",
							}}
							loading={props.loading}
						/>
					</Card.Section>
				))}
			</Card>
		);
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
								<SingleFeed key={index} feed={item} />
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
								<SingleFeed key={index} feed={item} />
							</Card.Section>
						)}
					</Link>
				))
			)}
		</Card>
	);
};

export default Feed;
