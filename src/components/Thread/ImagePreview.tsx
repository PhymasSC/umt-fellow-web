import { FileWithPath } from "@mantine/dropzone";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  Title,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconArrowsDiagonal2, IconX } from "@tabler/icons";

interface ImagePreviewInterface {
  file?: FileWithPath;
  setFiles?: Dispatch<SetStateAction<any[]>>;
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
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const imageUrl = src || (file && URL.createObjectURL(file));

  useEffect(() => {
    const getBlob = async () => {
      if (src && setFiles) {
        try {
          console.log("TEST");
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
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title={<Text>Are you sure you want to delete the photo?</Text>}
        centered
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Flex direction="row-reverse" gap="md">
          <Button
            color="red"
            variant="light"
            onClick={() => {
              setDeleteModalOpened(false);
              cancelCallback && cancelCallback();
            }}
          >
            Confirm
          </Button>
          <Button
            variant="subtle"
            onClick={() => {
              setDeleteModalOpened(false);
            }}
          >
            Cancel
          </Button>
        </Flex>
      </Modal>
      {!isBusy && (
        <Box sx={{ position: "relative" }}>
          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title={<Title order={4}>{title || file?.name}</Title>}
            size="auto"
            overlayProps={{
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3,
            }}
          >
            <Image
              src={imageUrl?.replace(/tr:([hw]-\d*,?)*\//g, "")}
              alt="preview image"
              radius="lg"
              width="100%"
              imageProps={{
                onLoad: () => file && imageUrl && URL.revokeObjectURL(imageUrl),
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
          >
            {isUpload ? (
              <IconX
                size={20}
                color="gray"
                onClick={() => setDeleteModalOpened(true)}
              />
            ) : (
              <IconArrowsDiagonal2
                onClick={() => setOpened(true)}
                size={20}
                color="gray"
              />
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
                file && imageUrl && URL.revokeObjectURL(blobUrl || imageUrl),
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
