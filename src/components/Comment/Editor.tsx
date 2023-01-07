import {
	Box,
	Card,
	Stack,
	Textarea,
	Title,
	Space,
	Button,
	Flex,
	TextInput,
} from "@mantine/core";
import { IconHash } from "@tabler/icons";
import ImageDropzone from "./ImageDropzone";
import { useState } from "react";

const Editor = () => {
	const [titleLength, setTitleLength] = useState(0);
	return (
		<>
			<Card
				withBorder
				shadow="sm"
				radius="md"
				sx={{ padding: "2em !important" }}
			>
				<Title order={3}>Create a thread</Title>
				<Space h="md" />
				<Stack>
					<Box sx={{ position: "relative" }}>
						<Textarea
							placeholder="Title"
							autosize
							minRows={1}
							maxRows={4}
							maxLength={200}
							onChange={(event) => {
								setTitleLength(event.target.value.length);
							}}
							rightSection={
								<Box
									sx={{
										fontSize: ".6em",
										paddingRight: "1em",
									}}
								>
									{titleLength}/200
								</Box>
							}
						/>
					</Box>
					<TextInput
						placeholder="tags"
						icon={<IconHash size={14} />}
						onChange={(event) => {
							event.target.value = event.target.value
						}}
					/>
					<Textarea
						placeholder="Describe your problems in details"
						withAsterisk
						minRows={4}
					/>
					<ImageDropzone></ImageDropzone>
				</Stack>
				<Space h="md" />
				<Flex justify="flex-end">
					<Button variant="subtle" color="red">
						Discard
					</Button>
					<Button variant="filled" color="blue">
						Post
					</Button>
				</Flex>
			</Card>
		</>
	);
};

export default Editor;
