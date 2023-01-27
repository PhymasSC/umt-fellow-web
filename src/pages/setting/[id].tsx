//@ts-nocheck
import { NextPage } from "next";
import { Setting as SettingComponent } from "@components/index";
import { Container } from "@mantine/core";
import { SETTINGS } from "@constants/setting";

const Setting: NextPage = (props) => {
	return (
		<>
			<Container>
				<SettingComponent setting={SETTINGS}> </SettingComponent>
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
