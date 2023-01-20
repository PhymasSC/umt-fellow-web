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
import { IconHash, IconLetterT, IconAlertTriangle } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FileWithPath } from "@mantine/dropzone";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import RTE from "./RichTextEditor";

const Editor = () => {
	const [titleLength, setTitleLength] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<FileWithPath[]>([]);
	const titleRef = useRef<HTMLTextAreaElement>(null);
	const [submitThread] = useMutation(ADD_THREAD);
	const { data: session } = useSession();
	const router = useRouter();

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
	}, [titleRef.current?.value]);

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { hasErrors, errors } = form.validate();
		if (hasErrors) {
			return;
		}
		setIsLoading(true);
		const getBase64 = (file: File): Promise<string> => {
			return new Promise<string>((resolve) => {
				let fileInfo;
				let baseURL = "";
				// Make new FileReader
				let reader = new FileReader();

				// Convert the file to base64 text
				reader.readAsDataURL(file);

				// on reader load somthing...
				reader.onload = () => {
					// Make a fileInfo Object
					baseURL = reader?.result?.toString() || "";
					resolve(baseURL);
				};
			});
		};

		const filesBase64 = files.map(async (file) => {
			return await {
				name: file.name,
				blob: await getBase64(file).then((res) => res),
			};
		});

		const getFilesInBase64 = async () => {
			const resolvedValues = [];
			for await (const fileBase64 of filesBase64) {
				resolvedValues.push(fileBase64);
			}
			const res = await submitThread({
				variables: {
					title: form.values.title,
					// tags: form.values.tags,
					description: form.values.description,
					//@ts-ignore
					author: session?.user?.id || "",
					images: resolvedValues,
				},
			});
			setIsLoading(false);
			console.log(res);
			if (res?.data?.addThread.code === 200) {
				router.push(`/thread/${res?.data?.addThread.thread.id}`);
			} else {
				showNotification({
					title: "Oops, something wrong happened",
					message:
						"There's some issue with the connection to the server, please try again.",
					autoClose: 3000,
					color: "orange",
					icon: <IconAlertTriangle />,
				});
			}
		};
		getFilesInBase64();
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
						<RTE form={form} />
						<ImageDropzone
							files={files}
							setfiles={setFiles}
						></ImageDropzone>
					</Stack>
					<Space h="md" />
					<Flex direction="row-reverse">
						<Button
							type="submit"
							variant="filled"
							color="blue"
							loading={isLoading}
						>
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
