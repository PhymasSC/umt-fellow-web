import { Group, Text, useMantineTheme, Flex, ScrollArea } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
import { Dispatch, Key, SetStateAction } from "react";
import ImagePreview from "./ImagePreview";

type ExistingImageProps = {
  id: string;
  url: string;
  isExisting: boolean;
  isDeleted: boolean;
};
const ImageDropzone = (
  props: Partial<DropzoneProps> & {
    newImages: FileWithPath[];
    setNewImages: Dispatch<SetStateAction<any[]>>;
    existingImages: ExistingImageProps[];
    setExistingImages: Dispatch<SetStateAction<any[]>>;
  }
) => {
  const theme = useMantineTheme();
  const { newImages, setNewImages, existingImages, setExistingImages } = props;

  return (
    <>
      <ScrollArea style={{ height: 300 }}>
        <Flex gap="md" sx={{ maxWidth: 99999 }}>
          <Dropzone
            onDrop={(file) =>
              setNewImages([
                ...newImages,
                ...file.slice(
                  0,
                  5 -
                    (newImages.length +
                      existingImages.filter((img) => !img.isDeleted).length)
                ),
              ])
            }
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            sx={{
              width: 400,
              cursor: newImages.length >= 5 ? "not-allowed" : "pointer",
            }}
            disabled={newImages.length >= 5}
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
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={75} stroke={1} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline align="center">
                  Drag images here or click to select files (Optional)
                </Text>
                <Text size="sm" color="dimmed" inline align="center" mt={7}>
                  Each file should not exceed 5mb
                </Text>
                <Text size="sm" color="dimmed" inline align="center" mt={7}>
                  Total images:{" "}
                  {newImages.length +
                    existingImages.filter((img) => !img.isDeleted).length}{" "}
                  / 5
                </Text>
              </div>
            </Group>
          </Dropzone>

          {existingImages.map(
            (image: ExistingImageProps, index: Key) =>
              image.isDeleted === false && (
                <ImagePreview
                  src={`https://ik.imagekit.io/umtfellow/tr:h-300/${image.url}`}
                  key={index}
                  isUpload={true}
                  cancelCallback={() => {
                    setExistingImages(
                      existingImages.map((f: any) => {
                        if (f == image) image.isDeleted = true;
                        return f;
                      })
                    );
                  }}
                />
              )
          )}
          {newImages.map(
            (image: FileWithPath, index: Key | null | undefined) => (
              <ImagePreview
                file={image}
                key={index}
                isUpload={true}
                setFiles={setNewImages}
                cancelCallback={() => {
                  setNewImages(newImages.filter((f: any) => f !== image));
                }}
              />
            )
          )}
        </Flex>
      </ScrollArea>
    </>
  );
};

export default ImageDropzone;
