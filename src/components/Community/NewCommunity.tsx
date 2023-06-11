import { FormLayout } from "@components/Form";
import { Avatar, Button, Flex, Input, Space, Textarea } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
type FormLayoutProps = {
  layout: "horizontal" | "vertical";
  label: string | React.ReactNode;
  description: string;
  input: React.ReactNode;
};

const NewCommunity = () => {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      avatarImg: "",
      bannerImg: "",
    },
  });

  const Form: FormLayoutProps[] = [
    {
      layout: "horizontal",
      label: "Avatar",
      description:
        "The avatar image is a small image that represents your community. It will be displayed next to the community name in all forum listings. Recommended image size: 100x100 pixels",
      input: (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          onDrop={(img) => {
            form.setValues({ avatarImg: URL.createObjectURL(img[0]) });
          }}
          sx={{
            position: "relative",
            borderRadius: "999rem",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Avatar
            radius="999rem"
            size="xl"
            src={form.values.avatarImg || null}
            onLoad={() => {
              URL.revokeObjectURL(form.values.avatarImg);
            }}
          />
        </Dropzone>
      ),
    },
    {
      layout: "horizontal",
      label: "Banner",
      description:
        "The banner image is a larger image that appears at the top of your community's forum page. It can be used to showcase your community's purpose, goals, or members. Recommended image size: 1920x1200 pixels",
      input: (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          onDrop={(img) => {
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
      input: <Input placeholder="Name" {...form.getInputProps("name")} />,
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
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      onReset={form.onReset}
    >
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
        <Button type="submit">Create</Button>
        <Button type="reset" variant="subtle" color="red">
          Cancel
        </Button>
      </Flex>
    </form>
  );
};

export default NewCommunity;
