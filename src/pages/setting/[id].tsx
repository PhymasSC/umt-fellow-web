//@ts-nocheck
import { NextPage } from "next";
import { Setting as SettingComponent } from "@components/index";
import { GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";
import { Container } from "@mantine/core";

const mock_data = {
	accountSettings: {
		label: "Configure notifications",
		description: "Choose what notifications you want to receive",
		data: [
			{
				label: "Messages",
				description:
					"Direct messages you have received from other users",
			},
			{
				label: "Review requests",
				description: "Code review requests from your team members",
			},
			{
				label: "Comments",
				description: "Daily digest with comments on your posts",
			},
			{
				label: "Recommendations",
				description:
					"Digest with best community posts from previous week",
			},
		],
	},
};
const Setting: NextPage = (props) => {
	return (
		<>
			<Container>
				<SettingComponent {...mock_data}></SettingComponent>
			</Container>
		</>
	);
};

// export async function getServerSideProps(context: { params: { id: string } }) {
// 	const id = context.params.id;
// 	try {
// 		const { data } = await client.query({
// 			query: GET_USER,
// 			variables: { id },
// 		});
// 		return {
// 			props: data,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	return {
// 		notFound: true,
// 	};
// }
export default Setting;
