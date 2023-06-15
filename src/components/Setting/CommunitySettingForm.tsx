import { FormLayout, Input, KeyValueInput } from "@components/Form";
import { TextInput, Button, Textarea } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { UPDATE_COMMUNITY } from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";

type data = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
  };
};

const CommunitySettingForm = (props: data) => {
  const { id, name, description, avatar, banner } = props.data;

  return (
    <>
      <FormLayout
        layout={"horizontal"}
        label={"Community Avatar"}
        description={"The avatar of the community"}
        input={
          <ImageInput
            img={`https://ik.imagekit.io/umtfellow/tr:h-600/${avatar}`}
            mutation={UPDATE_COMMUNITY({ avatar: true })}
            imgName={name}
            argType={"avatar"}
            variables={{ id: id }}
          />
        }
      />
      <FormLayout
        layout={"horizontal"}
        label={"Community banner"}
        description={"The banner of the community"}
        input={
          <ImageInput
            isBanner
            img={`https://ik.imagekit.io/umtfellow/tr:h-600/${banner}`}
            mutation={UPDATE_COMMUNITY({ banner: true })}
            imgName={name}
            argType={"banner"}
            variables={{ id: id }}
          />
        }
      />
      <FormLayout
        layout={"vertical"}
        label={"Community Name"}
        description={"The name of the community"}
        input={
          <Input
            argType="name"
            component={TextInput}
            mutation={UPDATE_COMMUNITY({ name: true })}
            variables={{ id: id }}
            placeholder={name || "Community Name"}
            value={name}
            mt="-1em"
            mb="1em"
          />
        }
      />
      <FormLayout
        layout={"vertical"}
        label={"Community Description"}
        description={"The description of the community"}
        input={
          <Input
            argType="description"
            component={Textarea}
            mutation={UPDATE_COMMUNITY({ description: true })}
            variables={{ id: id }}
            mt="-1em"
            mb="1em"
            placeholder={description || "Community Description"}
            value={description}
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
    </>
  );
};

export default CommunitySettingForm;
