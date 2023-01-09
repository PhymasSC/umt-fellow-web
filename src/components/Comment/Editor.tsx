import {
	Box,
	Card,
	Stack,
	Textarea,
	Title,
	Space,
	Button,
	Flex,
	MultiSelect,
} from "@mantine/core";
import ImageDropzone from "./ImageDropzone";
import { ADD_THREAD } from "@operations/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { IconHash, IconLetterT } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const Editor = () => {
	const [titleLength, setTitleLength] = useState(0);
	const titleRef = useRef<HTMLTextAreaElement>(null);
	const [submitThread] = useMutation(ADD_THREAD);
	const { data: session } = useSession();

	const form = useForm({
		initialValues: {
			title: "",
			tags: [],
			description: "",
			images: [],
		},

		validate: {
			title: (value) => {
				if (value.length < 5) {
					return "Title must be at least 5 characters";
				}
			},
		},
	});

	useEffect(() => {
		setTitleLength(titleRef.current?.value.length || 0);
	}, [titleRef.current?.value.length]);

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { hasErrors, errors } = form.validate();

		if (hasErrors) {
			return;
		}

		submitThread({
			variables: {
				title: form.values.title,
				// tags: form.values.tags,
				description: form.values.description,
				//@ts-ignore
				author: session?.user?.id || "",
			},
		});
	};
	return (
		<>
			<Card
				withBorder
				shadow="sm"
				radius="md"
				sx={{ padding: "2em !important" }}
			>
				<form onSubmit={submitHandler}>
					<Title order={3}>Create a thread</Title>
					<Space h="md" />
					<Stack>
						<Box sx={{ position: "relative" }}>
							<Textarea
								ref={titleRef}
								icon={<IconLetterT size={14} />}
								placeholder="Title"
								autosize
								minRows={1}
								maxRows={4}
								maxLength={200}
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
								required
								{...form.getInputProps("title")}
							/>
						</Box>
						<MultiSelect
							placeholder="Select tags (Optional)"
							data={[]}
							icon={<IconHash size={14} />}
							searchable
							creatable
							clearable
							maxSelectedValues={3}
							getCreateLabel={(query) => `+ Create ${query}`}
							// onCreate={(query) => {
							// 	const item = { value: query, label: query };
							// 	setData((current) => [...current, item]);
							// 	return item;
							// }}
							{...form.getInputProps("tags")}
						/>
						<Textarea
							placeholder="Describe your problems in details"
							required
							minRows={4}
							{...form.getInputProps("description")}
						/>
						<ImageDropzone></ImageDropzone>
					</Stack>
					<Space h="md" />
					<Flex direction="row-reverse">
						<Button type="submit" variant="filled" color="blue">
							Post
						</Button>
						<Button variant="subtle" color="red">
							Discard
						</Button>
					</Flex>
				</form>
			</Card>
		</>
	);
};

export default Editor;
