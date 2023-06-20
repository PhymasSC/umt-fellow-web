import { FormLayout, Input, KeyValueInput } from "@components/Form";
import { TextInput, Button, Textarea } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { UPDATE_COMMUNITY } from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";
import Search from "@components/Search";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITY_RULES } from "@operations/queries";
import { useEffect } from "react";

type data = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
  };
};

type RuleType = {
  getCommunityRules: {
    id: string;
    rule: string;
    description: string;
  }[];
};
const CommunitySettingForm = (props: data) => {
  const { id, name, description, avatar, banner } = props.data;
  const { loading, data: rules } = useQuery(GET_COMMUNITY_RULES, {
    variables: { communityId: id },
  });

  useEffect(() => {
    console.log(rules);
  }, [rules]);
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
        label={"Moderators"}
        description={
          "Add or remove moderators from the community. Maximum 5 mods."
        }
        input={
          <>
            <Search
              onChange={(val) => {
                console.log(val);
              }}
            />
          </>
        }
      />

      {loading || (
        <FormLayout
          layout={"vertical"}
          label={"Community Rules"}
          description={"The rules of the community"}
          input={
            <KeyValueInput
              _key="Name"
              value="Description"
              data={rules.getCommunityRules || []}
              communityId={id}
            />
          }
        />
      )}

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
