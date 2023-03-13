import { Group, Text, useMantineTheme, Flex, ScrollArea } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import {
	Dropzone,
	DropzoneProps,
	IMAGE_MIME_TYPE,
	FileWithPath,
} from "@mantine/dropzone";
import { Dispatch, Key, SetStateAction, useEffect } from "react";
import ImagePreview from "./ImagePreview";

const ImageDropzone = (
	props: Partial<DropzoneProps> & {
		files: any[];
		setfiles: Dispatch<SetStateAction<any[]>>;
		existingImages?: string[];
	}
) => {
	const theme = useMantineTheme();
	const { files, setfiles, existingImages } = props;

	useEffect(() => {
		if (existingImages) setfiles([...existingImages]);
	}, []);
	return (
		<>
			<ScrollArea style={{ height: 300 }}>
				<Flex gap="md" sx={{ maxWidth: 99999 }}>
					<Dropzone
						onDrop={(file) =>
							setfiles([
								...files,
								...file.slice(0, 5 - files.length),
							])
						}
						onReject={(files) =>
							console.log("rejected files", files)
						}
						maxSize={5 * 1024 ** 2}
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
						(
							file: FileWithPath | string,
							index: Key | null | undefined
						) => {
							console.log(index, file);
							if (typeof file === "string")
								return (
									<ImagePreview
										src={`https://ik.imagekit.io/umtfellow/tr:h-300/${file}`}
										key={index}
										isUpload={true}
										setFiles={setfiles}
										cancelCallback={() => {
											setfiles(
												files.filter((f: any) => {
													console.log(
														`Files:`,
														files
													);
													return f !== file;
												})
											);
										}}
									/>
								);
							return (
								<ImagePreview
									file={file}
									key={index}
									isUpload={true}
									setFiles={setfiles}
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
