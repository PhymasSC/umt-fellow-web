import { FormLayout, KeyValueInput } from "@components/Form";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash, IconPencil } from "@tabler/icons";

type data = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
  };
};

const CommunitySettingForm = (props: data) => {
  const { id, name, description, avatar } = props.data;
  const form = useForm({
    initialValues: {
      name: name,
      description: description,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      onReset={form.onReset}
    >
      <FormLayout
        layout={"vertical"}
        label={"Community Name"}
        description={"The name of the community"}
        input={<TextInput mt="-1em" mb="1em" {...form.getInputProps("name")} />}
      />
      <FormLayout
        layout={"vertical"}
        label={"Community Description"}
        description={"The description of the community"}
        input={
          <TextInput
            mt="-1em"
            mb="1em"
            {...form.getInputProps("description")}
          />
        }
      />

      <FormLayout
        layout={"vertical"}
        label={"Community Rules"}
        description={"The rules of the community"}
        input={<KeyValueInput _key="Name" value="Description" />}
      />

      <FormLayout
        layout={"horizontal"}
        label={"Delete Community"}
        description={"Delete the community"}
        input={
          <Button
            fullWidth
            type="reset"
            color="red"
            variant="outline"
            leftIcon={<IconTrash size={16} />}
          >
            Delete Community
          </Button>
        }
      />

      <FormLayout
        layout={"horizontal"}
        label={"Save Changes"}
        description={"Save the changes"}
        input={
          <Button
            type="submit"
            fullWidth
            variant="white"
            leftIcon={<IconPencil size={16} />}
          >
            Save Changes
          </Button>
        }
      />
    </form>
  );
};

export default CommunitySettingForm;
