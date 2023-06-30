import { FormLayout, Input, KeyValueInput } from "@components/Form";
import {
  TextInput,
  Button,
  Textarea,
  Modal,
  useMantineTheme,
  List,
  Divider,
  Text,
  Flex,
} from "@mantine/core";
import { IconAlertCircle, IconTrash } from "@tabler/icons";
import { UPDATE_COMMUNITY } from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";
import Search from "@components/Search";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITY_RULES } from "@operations/queries";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

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
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const deleteForm = useForm({
    initialValues: {
      confirm: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (values.confirm !== name) {
        errors.confirm = `Please type ${name} to confirm`;
      }
      return errors;
    },
  });
  const [isDeleting, setIsDeleting] = useState(false);
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
      {/* <FormLayout
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
      /> */}

      {loading || (
        <FormLayout
          layout={"vertical"}
          label={"Community Rules"}
          description={
            'Add specific rules to govern the conduct and content within your community. By defining clear guidelines, you can foster a positive and inclusive environment for all members. Use the "Rule" input to provide a concise description of the rule, and the "Description" input to provide additional details and context for better understanding and adherence.'
          }
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

      {/* <FormLayout
        layout={"horizontal"}
        label={"Archive Community"}
        description={
          "Activate this setting to transition a community into an archived state. Once archived, the community will no longer be actively participatory, but users can still view its content and history. It is an ideal option for preserving valuable discussions while limiting further interactions such as joining or posting new content."
        }
        input={
          <Button
            fullWidth
            type="reset"
            color="orange"
            variant="light"
            leftIcon={<IconTrash size={16} />}
          >
            Archive Community
          </Button>
        }
      /> */}
      <FormLayout
        layout={"horizontal"}
        label={"Delete Community"}
        description={
          "Activate this setting to transition a community into an archived state. Once archived, the community will no longer be actively participatory, but users can still view its content and history. It is an ideal option for preserving valuable discussions while limiting further interactions such as joining or posting new content."
        }
        input={
          <>
            <Button
              fullWidth
              type="reset"
              color="red"
              variant="light"
              leftIcon={<IconTrash size={16} />}
              onClick={open}
            >
              Delete Community
            </Button>
            <Modal
              opened={opened}
              onClose={close}
              centered
              title={
                <Text fw="bolder" color="red">
                  <Flex gap="xs" align="center">
                    <IconAlertCircle color="red" size={18} />
                    Delete {name}
                  </Flex>
                </Text>
              }
              overlayProps={{
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
              }}
              size="lg"
            >
              <Modal.Body>
                Please take note of the following points before proceeding with
                the community deletion:
                <List>
                  <List.Item>
                    This action is permanent and cannot be undone.
                  </List.Item>
                  <List.Item>
                    Deleting the community will remove all content, discussions,
                    and member data associated with it.
                  </List.Item>
                  <List.Item>
                    Consider alternative options such as addressing concerns
                    through moderation or rule changes.
                  </List.Item>
                  <List.Item>
                    Once deleted, the community cannot be recovered.
                  </List.Item>
                </List>
                <Divider my="md" />
                <Text fw="bold">
                  Are you absolutely certain you want to proceed with deleting
                  the community?
                </Text>
                <Text>
                  Please type the{" "}
                  <Text fw="bold" span>
                    {name}
                  </Text>{" "}
                  to confirm:
                </Text>
                <TextInput {...deleteForm.getInputProps("confirm")} />
                <Button
                  fullWidth
                  color="red"
                  mt="md"
                  disabled={isDeleting || deleteForm.values.confirm !== name}
                >
                  Yes I'm sure - Delete Community
                </Button>
              </Modal.Body>
            </Modal>
          </>
        }
      />
    </>
  );
};

export default CommunitySettingForm;
