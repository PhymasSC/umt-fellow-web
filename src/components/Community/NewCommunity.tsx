import { useMutation } from "@apollo/client";
import { FormLayout } from "@components/Form";
import {
  Avatar,
  Button,
  Flex,
  TextInput,
  Space,
  Text,
  Textarea,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { ADD_COMMUNITY } from "@operations/mutations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

type FormLayoutProps = {
  layout: "horizontal" | "vertical";
  label: string | React.ReactNode;
  description: string | React.ReactNode;
  input: React.ReactNode;
};

const NewCommunity = () => {
  const [avatarObj, setAvatarObj] = useState<FileWithPath>({} as FileWithPath);
  const [bannerObj, setBannerObj] = useState<FileWithPath>({} as FileWithPath);
  const [loading, setLoading] = useState(false);
  const [addCommunity] = useMutation(ADD_COMMUNITY);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      avatarImg: "",
      bannerImg: "",
    },
  });

  const getBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader?.result?.toString() || "";
        resolve(baseURL);
      };
    });
  };

  const submitHandler = async (values: {
    name: string;
    description: string;
    avatarImg: string;
    bannerImg: string;
  }) => {
    setLoading(true);
    const avatarBlob = await getBase64(avatarObj).then((res) => res);
    const bannerBlob = await getBase64(bannerObj).then((res) => res);
    const variables = {
      name: values.name || "",
      description: values.description || "",
      avatar: avatarBlob || "",
      banner: bannerBlob || "",
      creatorId: session?.user.id || "",
    };

    const res = await addCommunity({ variables });

    const communityId = res.data?.addCommunity.community.id;

    setLoading(false);

    res.data?.addCommunity.success === false
      ? form.setErrors({
          name: `A community with the name '${values.name}' already exists. Please choose a different name.`,
        })
      : router.push(`/community/${communityId}`);
  };

  const Form: FormLayoutProps[] = [
    {
      layout: "horizontal",
      label: "Avatar",
      description: (
        <>
          The avatar image is a small image that represents your community. It
          will be displayed next to the community name in all forum listings.
          <Text fw="bold">Recommended image size: 100x100 pixels</Text>
        </>
      ),
      input: (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          onDrop={(img) => {
            setAvatarObj(img[0]);
            form.setValues({ avatarImg: URL.createObjectURL(img[0]) });
          }}
          radius={999}
          sx={{
            width: "fit-content",
          }}
        >
          <Avatar
            size="xl"
            src={form.values.avatarImg || null}
            onLoad={() => {
              URL.revokeObjectURL(form.values.avatarImg);
            }}
            radius={999}
          />
        </Dropzone>
      ),
    },
    {
      layout: "horizontal",
      label: "Banner",
      description: (
        <>
          The banner image is a larger image that appears at the top of your
          community&apos;s forum page. It can be used to showcase your
          community&apos;s purpose, goals, or members.
          <Text fw="bold">Recommended image size: 1920x1200 pixels</Text>
        </>
      ),
      input: (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          onDrop={(img) => {
            setBannerObj(img[0]);
            form.setValues({ bannerImg: URL.createObjectURL(img[0]) });
          }}
        >
          <Avatar
            size="xl"
            src={form.values.bannerImg || null}
            onLoad={() => {
              URL.revokeObjectURL(form.values.bannerImg);
            }}
            sx={{
              width: "100%",
              height: "fit-content",
            }}
          />
        </Dropzone>
      ),
    },
    {
      layout: "horizontal",
      label: "Name",
      description:
        "The name of the community is what users will see when they browse forum listings. It should be clear, concise, and easy to remember.",
      input: <TextInput placeholder="Name" {...form.getInputProps("name")} />,
    },
    {
      layout: "horizontal",
      label: "Description",
      description:
        "The description of the community is a brief overview of what your community is about. It should be informative and engaging, and it should give users a good idea of what they can expect from your community.",
      input: (
        <Textarea
          placeholder="Description"
          autosize
          maxRows={10}
          spellCheck
          {...form.getInputProps("description")}
        />
      ),
    },
  ];

  return (
    <form onSubmit={form.onSubmit(submitHandler)} onReset={form.onReset}>
      {Form.map((form, index) => (
        <FormLayout
          key={index}
          layout={form.layout}
          label={form.label}
          description={form.description}
          input={form.input}
        />
      ))}
      <Space h="md" />
      <Flex direction="row-reverse">
        <Button type="submit" loading={loading}>
          Create
        </Button>
        <Button type="reset" variant="subtle" color="red" disabled={loading}>
          Cancel
        </Button>
      </Flex>
    </form>
  );
};

export default NewCommunity;
