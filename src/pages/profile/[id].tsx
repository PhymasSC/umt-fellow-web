//@ts-nocheck
import { NextPage } from "next";
import { Profile as ProfileComponent } from "@components/index";
import { GET_THREADS, GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";

const Profile: NextPage = (props) => {
	console.log(props);
	const { userdata, threadData } = props;
	return (
		<>
			<ProfileComponent
				user={userdata?.getUser}
				threads={threadData}
			></ProfileComponent>
		</>
	);
};

export async function getServerSideProps(context: { params: { id: string } }) {
	const id = context.params.id;
	try {
		const { data: userdata } = await client.query({
			query: GET_USER,
			variables: { id },
		});
		const { data: threadData } = await client.query({
			query: GET_THREADS,
		});
		console.log("ThreadData: ", threadData);
		console.log("User data: ", userdata);
		return {
			props: {
				userdata: userdata,
				threadData: threadData,
			},
		};
	} catch (error) {
		console.log(error);
	}

	return {
		notFound: true,
	};
}
export default Profile;