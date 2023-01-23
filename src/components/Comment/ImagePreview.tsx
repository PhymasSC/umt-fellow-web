import { FileWithPath } from "@mantine/dropzone";
import {
	ActionIcon,
	Box,
	Image,
	Modal,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconArrowsDiagonal2, IconX } from "@tabler/icons";

interface ImagePreviewInterface {
	file?: FileWithPath;
	setFiles: Dispatch<SetStateAction<any[]>>;
	isUpload?: boolean;
	cancelCallback?: () => void;
	src?: string;
	title?: string;
	width?: number | string;
	height?: number | string;
}

const ImagePreview = (props: ImagePreviewInterface) => {
	const theme = useMantineTheme();
	const [isBusy, setIsBusy] = useState(true);
	const {
		file,
		setFiles,
		isUpload,
		cancelCallback,
		src,
		title,
		width,
		height,
	} = props;
	const [blobUrl, setBlobUrl] = useState<string>("");
	const [opened, setOpened] = useState(false);
	const imageUrl = src || (file && URL.createObjectURL(file));

	useEffect(() => {
		const getBlob = async () => {
			if (src) {
				try {
					const response = await fetch(imageUrl || "");
					const blob = await response.blob();
					const blobUrl = URL.createObjectURL(blob);
					setBlobUrl(blobUrl);
					setFiles((prev) => {
						const newFiles = [...prev];
						newFiles.filter((f) => f.name !== file?.name);
						newFiles.push(blobUrl);
						return newFiles;
					});
				} catch (err) {
					console.log(err);
				}
			}
		};

		getBlob();
		setIsBusy(false);
	}, []);

	return (
		<>
			{!isBusy && (
				<Box sx={{ position: "relative" }}>
					<Modal
						centered
						opened={opened}
						onClose={() => setOpened(false)}
						title={<Title order={4}>{title || file?.name}</Title>}
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
							src={imageUrl?.replace(/tr:([hw]-\d*,?)*\//g, "")}
							alt="preview image"
							radius="lg"
							width="100%"
							imageProps={{
								onLoad: () =>
									file &&
									imageUrl &&
									URL.revokeObjectURL(imageUrl),
							}}
						/>
					</Modal>
					<ActionIcon
						variant="subtle"
						color="blue"
						sx={{
							position: "absolute",
							top: "0.3em",
							right: "0.3em",
							zIndex: 99,
						}}
						onClick={cancelCallback}
					>
						{isUpload ? (
							<IconX size={20} color="gray" />
						) : (
							<IconArrowsDiagonal2 size={20} color="gray" />
						)}
					</ActionIcon>
					<Image
						src={blobUrl || imageUrl}
						alt="preview image"
						width={width || 250}
						height={height || 250}
						radius="lg"
						imageProps={{
							onLoad: () =>
								file &&
								imageUrl &&
								URL.revokeObjectURL(blobUrl || imageUrl),
						}}
						onClick={() => setOpened(true)}
						sx={{
							"&:hover": {
								cursor: "pointer",
							},
						}}
					/>
				</Box>
			)}
		</>
	);
};

export default ImagePreview;
