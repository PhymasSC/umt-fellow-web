import { FileWithPath } from "@mantine/dropzone";
import {
	ActionIcon,
	Box,
	Image,
	Modal,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { IconX } from "@tabler/icons";

interface ImagePreviewInterface {
	file: FileWithPath;
}
const ImagePreview = (props: ImagePreviewInterface) => {
	const theme = useMantineTheme();
	const { file } = props;
	const [opened, setOpened] = useState(false);
	const imageUrl = URL.createObjectURL(file);

	return (
		<>
			<Modal
				centered
				opened={opened}
				onClose={() => setOpened(false)}
				title={<Title order={4}>{file.name}</Title>}
				size="auto"
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<Image
					src={imageUrl}
					alt="preview image"
					radius="lg"
					width="100%"
					imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
				/>
			</Modal>
			<Image
				src={imageUrl}
				alt="preview image"
				width={200}
				height={200}
				radius="lg"
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
				onClick={() => setOpened(true)}
				sx={{
					"&:hover": {
						cursor: "pointer",
					},
				}}
			/>
		</>
	);
};

export default ImagePreview;
