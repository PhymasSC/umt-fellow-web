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
import { Dispatch, Key, SetStateAction, useState } from "react";
import { toBase64 } from "@utils/base64";
import ImagePreview from "./ImagePreview";

const ImageDropzone = (
	props: Partial<DropzoneProps> & {
		files: FileWithPath[];
		setfiles: Dispatch<SetStateAction<FileWithPath[]>>;
	}
) => {
	const theme = useMantineTheme();
	const { files, setfiles } = props;

	return (
		<>
			<ScrollArea style={{ height: 300 }}>
				<Flex gap="md" sx={{ maxWidth: 99999 }}>
					<Dropzone
						onDrop={(file) => setfiles([...files, file[0]])}
						onReject={(files) =>
							console.log("rejected files", files)
						}
						maxSize={3 * 1024 ** 2}
						accept={IMAGE_MIME_TYPE}
						sx={{
							width: 400,
							cursor:
								files.length >= 5 ? "not-allowed" : "pointer",
						}}
						disabled={files.length >= 5}
						multiple={true}
						{...props}
					>
						<Group
							position="center"
							spacing="xl"
							style={{ height: 225, pointerEvents: "none" }}
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
								<IconPhoto size={75} stroke={1} />
							</Dropzone.Idle>

							<div>
								<Text size="xl" inline align="center">
									Drag images here or click to select files
									(Optional)
								</Text>
								<Text
									size="sm"
									color="dimmed"
									inline
									align="center"
									mt={7}
								>
									Each file should not exceed 5mb
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
					{files.map(
						(file: FileWithPath, index: Key | null | undefined) => {
							return (
								<ImagePreview
									file={file}
									key={index}
									isUpload={true}
									cancelCallback={() => {
										setfiles(
											files.filter((f: any) => f !== file)
										);
									}}
								/>
							);
						}
					)}
				</Flex>
			</ScrollArea>
		</>
	);
};

export default ImageDropzone;
