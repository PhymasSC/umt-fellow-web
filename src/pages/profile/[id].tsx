//@ts-nocheck
import { NextPage } from "next";
import { Profile as ProfileComponent } from "@components/index";
import { GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";

const Profile: NextPage = (props) => {
	console.log(props);
	return (
		<>
			<ProfileComponent {...props?.getUser}></ProfileComponent>
		</>
	);
};

export async function getServerSideProps(context: { params: { id: string } }) {
	const id = context.params.id;
	try {
		const { data } = await client.query({
			query: GET_USER,
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
export default Profile;
