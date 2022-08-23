import { Feed } from "@components/index";
import { Container } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<Container size="sm">
				<Feed />
			</Container>
		</>
	);
};

export default Home;
