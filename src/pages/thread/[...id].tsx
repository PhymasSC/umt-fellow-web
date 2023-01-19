import { NextPage } from "next";
import { useRouter } from "next/router";
import { GET_THREAD } from "@operations/queries";
import { client } from "@lib/apollo-client";
import SingleFeed from "@components/Feed/SingleFeed";
import {
	Avatar,
	Card,
	Container,
	Text,
	Paper,
	Button,
	Grid,
	Title,
	Space,
	Divider,
	Center,
} from "@mantine/core";
import Link from "next/link";
import { Comment } from "@components/index";
import { useQuery } from "@apollo/client";

const ThreadPage: NextPage = (props) => {
	//@ts-ignore
	const { getThreadById: data } = props;
	return (
		<>
			<Container size="xl">
				<Grid>
					<Grid.Col span={8}>
						<Card withBorder>
							<SingleFeed {...data}></SingleFeed>
						</Card>

						<Space h="xl" />
						<Divider></Divider>
						<Space h="xl" />
						<Center>
							<Title>No Replies yet</Title>
						</Center>
						<Space h="xl" />
						<Comment
							author={{
								name: data?.author?.name,
								image: data?.author?.image,
							}}
						></Comment>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper
							radius="md"
							withBorder
							p="lg"
							sx={(theme) => ({
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[8]
										: theme.white,
							})}
						>
							<Title order={4}>Thread Starter</Title>
							<Space h="md"></Space>
							<Avatar
								src={data.author.image}
								size={120}
								radius={120}
								mx="auto"
							/>
							<Text align="center" size="lg" weight={500} mt="md">
								{data.author.name}
							</Text>

							<Link href={`/profile/${data.author.id}`} passHref>
								<Button
									component="a"
									variant="light"
									fullWidth
									mt="md"
								>
									View profile
								</Button>
							</Link>
							<Link href={`/message`} passHref>
								<Button
									component="a"
									variant="outline"
									fullWidth
									mt="md"
								>
									Send a message
								</Button>
							</Link>
						</Paper>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export async function getServerSideProps(context: { params: { id: string } }) {
	const id = Array.isArray(context.params.id)
		? context.params.id[0]
		: context.params.id;
	try {
		const { data } = await client.query({
			query: GET_THREAD,
			variables: { id },
		});
		return {
			props: data,
		};
	} catch (error) {
		console.log(error);
	}

	return {
		notFound: true,
	};
}

export default ThreadPage;
