import { NextPage } from "next";
import { Editor } from "@components/index";
import { Container } from "@mantine/core";

const Create: NextPage = () => {
	return (
		<Container>
			<Editor />
		</Container>
	);
};

export default Create;
