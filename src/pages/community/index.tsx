import {  CommunityList } from "@components/index";
import { Container, Title } from "@mantine/core";
import { COMMUNITIES } from "@constants/communities";
const Communities = () => {
	return (
		<Container>
			<Title mb="md">Community List</Title>
			<CommunityList communities={COMMUNITIES} />
		</Container>
	);
};

export default Communities;
