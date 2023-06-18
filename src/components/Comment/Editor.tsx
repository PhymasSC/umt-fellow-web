// @ts-nocheck
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
import { ADD_THREAD, UPDATE_THREAD } from "@operations/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { IconHash, IconLetterT, IconAlertTriangle } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FileWithPath } from "@mantine/dropzone";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import RTE from "./RichTextEditor";
import CommunityPicker from "./CommunityPicker";

interface Props {
  data?: DATA_TYPE;
}

type DATA_TYPE = {
  author: {
    id: string;
    image: string;
    name: string;
  };
  description: string;
  id: string;
  images: {
    id: string;
    imageUrl: string;
  }[];
  tags: string[];
  flag: string;
  title: string;
  community: string;
  created_at: string;
  updated_at: string;
};

interface FormValues {
  title: string;
  tags: string[];
  description: string;
  images: { id: string; imageUrl: string }[];
  community: string;
}

const Editor: React.FC<Props> = ({ data }) => {
  const [titleLength, setTitleLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newImages, setNewImages] = useState<FileWithPath[]>([]);
  const [existingImages, setExistingImages] = useState<
    { id: string; url: string; isExisting: boolean; isDeleted: boolean }[]
  >(
    (data?.images &&
      data?.images.length > 0 &&
      data?.images.map((image) => ({
        id: image.id,
        url: image.imageUrl,
        isExisting: true,
        isDeleted: false,
      }))) ||
      []
  );
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [submitThread] = useMutation(ADD_THREAD);
  const [updateThread] = useMutation(UPDATE_THREAD);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      title: data?.title || "",
      tags: [""],
      description: data?.description || "",
      images: data?.images || [],
      community: data?.community || "",
    },

    validate: {
      title: (value) => {
        if (value.length < 5) {
          return "Title must be at least 5 characters";
        }
      },
      community: (value) => {
        if (value.length < 1 && router.query.edit === undefined) {
          return "Please select a valid space";
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

    const imagesBase64 = newImages.map(async (image) => {
      return await {
        name: image.name,
        blob: await getBase64(image).then((res) => res),
        isExisting: false,
        isDeleted: false,
      };
    });

    const getFilesInBase64 = async () => {
      const resolvedValues: {
        name?: string;
        blob?: string;
        url?: string;
        isExisting: boolean;
        isDeleted: boolean;
      }[] = existingImages.filter((image) => image.isExisting);
      for await (const imageBase64 of imagesBase64) {
        resolvedValues.push(imageBase64);
      }

      let res;
      if (router.query.edit !== undefined) {
        res = await updateThread({
          variables: {
            id: data?.id || "",
            title: form.values.title,
            // tags: form.values.tags,
            description: form.values.description,
            images: resolvedValues,
          },
        });
      } else {
        res = await submitThread({
          variables: {
            title: form.values.title,
            // tags: form.values.tags,
            description: form.values.description,
            author: session?.user?.id || "",
            images: resolvedValues,
            communityId: form.values.community,
          },
        });
      }

      setIsLoading(false);

      if (
        res?.data?.addThread?.code === 200 ||
        res?.data?.updateThread?.code === 200
      ) {
        router.replace(
          `/thread/${
            res?.data?.addThread?.thread?.id ||
            res?.data?.updateThread?.thread?.id
          }`
        );
      } else {
        notifications.show({
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
          <Title order={3}>{data ? "Edit thread" : "New thread"}</Title>
          <Space h="md" />
          <Stack>
            {router.query.edit === undefined && (
              <CommunityPicker form={form} required />
            )}
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
            <RTE
              content={form.values.description}
              onUpdate={({ editor }) =>
                form.setFieldValue("description", editor.getHTML())
              }
            />
            <ImageDropzone
              newImages={newImages}
              setNewImages={setNewImages}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
          </Stack>
          <Space h="md" />
          <Flex direction="row-reverse">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              loading={isLoading}
            >
              {data ? "Update" : "Post"}
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
