import { NextPage } from "next";
import { useRouter } from "next/router";
import { GET_THREAD } from "@operations/queries";
import { client } from "@lib/apollo-client";
import SingleFeed from "@components/Feed/SingleFeed";
import { Card, Container } from "@mantine/core";

const ThreadPage: NextPage = (props) => {
	const router = useRouter();
	//@ts-ignore
	const { thread } = props;
	console.log(props);
	return (
		<>
			<Container>
				<Card withBorder>
					<SingleFeed {...thread}></SingleFeed>
				</Card>
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
