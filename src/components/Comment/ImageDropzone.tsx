import {
	Group,
	Text,
	useMantineTheme,
	Flex,
	Box,
	ActionIcon,
	ScrollArea,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import {
	Dropzone,
	DropzoneProps,
	IMAGE_MIME_TYPE,
	FileWithPath,
} from "@mantine/dropzone";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
const ImageDropzone = (props: Partial<DropzoneProps>) => {
	const theme = useMantineTheme();
	const [files, setFiles] = useState<FileWithPath[]>([]);

	return (
		<>
			<ScrollArea style={{ height: 250 }}>
				<Flex gap="md" sx={{ maxWidth: 99999 }}>
					<Dropzone
						onDrop={(file) => setFiles([...files, file[0]])}
						onReject={(files) =>
							console.log("rejected files", files)
						}
						maxSize={3 * 1024 ** 2}
						accept={IMAGE_MIME_TYPE}
						sx={{
							minWidth: 430,
							width: 430,
							cursor: files.length >= 5 ? "not-allowed" : "pointer",
						}}
						disabled={files.length >= 5}
						multiple={true}
						{...props}
					>
						<Group
							position="center"
							spacing="xl"
							style={{ minHeight: 200, pointerEvents: "none" }}
						>
							<Dropzone.Accept>
								<IconUpload
									size={50}
									stroke={1.5}
									color={
										theme.colors[theme.primaryColor][
											theme.colorScheme === "dark" ? 4 : 6
										]
									}
								/>
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX
									size={50}
									stroke={1.5}
									color={
										theme.colors.red[
											theme.colorScheme === "dark" ? 4 : 6
										]
									}
								/>
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconPhoto size={50} stroke={1.5} />
							</Dropzone.Idle>

							<div>
								<Text size="xl" inline align="center">
									Drag images here or click to select files
								</Text>
								<Text
									size="sm"
									color="dimmed"
									inline
									align="center"
									mt={7}
								>
									Attach as many files as you like, each file
									should not exceed 5mb
								</Text>
								<Text
									size="sm"
									color="dimmed"
									inline
									align="center"
									mt={7}
								>
									Total images: {files.length} / 5
								</Text>
							</div>
						</Group>
					</Dropzone>
					{files.map((file, index) => {
						return (
							<Box key={index} sx={{ position: "relative" }}>
								<ActionIcon
									variant="subtle"
									color="blue"
									sx={{
										position: "absolute",
										top: "0.3em",
										right: "0.3em",
										zIndex: 99,
									}}
									onClick={() => {
										setFiles(
											files.filter((f) => f !== file)
										);
									}}
								>
									<IconX size={20} color="gray" />
								</ActionIcon>
								<ImagePreview file={file} key={index} />
							</Box>
						);
					})}
				</Flex>
			</ScrollArea>
		</>
	);
};

export default ImageDropzone;
