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
  Loader,
  Card,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconArrowsTransferUp,
  IconCheck,
  IconTrash,
} from "@tabler/icons";
import {
  ADD_MODERATOR,
  DELETE_COMMUNITY,
  REMOVE_MODERATOR,
  UPDATE_COMMUNITY,
} from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_COMMUNITY_MEMBERS_BY_NAME,
  GET_COMMUNITY_MODERATORS,
  GET_COMMUNITY_RULES,
} from "@operations/queries";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import TableSelection from "@components/Form/Table";
import CMSearch from "@components/Search/CMSearch";
import { Role } from "@prisma/client";

type data = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
  };
};

const example = {
  data: [
    {
      id: "1",
      avatar:
        "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Robert Wolfkisser",
      job: "Engineer",
      email: "rob_wolf@gmail.com",
    },
    {
      id: "2",
      avatar:
        "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jill Jailbreaker",
      job: "Engineer",
      email: "jj@breaker.com",
    },
    {
      id: "3",
      avatar:
        "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Henry Silkeater",
      job: "Designer",
      email: "henry@silkeater.io",
    },
    {
      id: "4",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Bill Horsefighter",
      job: "Designer",
      email: "bhorsefighter@gmail.com",
    },
    {
      id: "5",
      avatar:
        "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jeremy Footviewer",
      job: "Manager",
      email: "jeremy@foot.dev",
    },
  ],
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
  const [deleteCommunity] = useMutation(DELETE_COMMUNITY);
  const { data: moderators } = useQuery(GET_COMMUNITY_MODERATORS, {
    variables: { communityId: id },
  });
  const { loading, data: rules } = useQuery(GET_COMMUNITY_RULES, {
    variables: { communityId: id },
  });
  const [addModerator] = useMutation(ADD_MODERATOR);
  const [removeModerator] = useMutation(REMOVE_MODERATOR);

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
            <CMSearch
              onChange={(val) => {
                console.log(val);
              }}
              placeholder="Search for members"
              query={GET_COMMUNITY_MEMBERS_BY_NAME}
              queryVar={{
                communityId: id,
                role: Role.USER,
              }}
              onItemSubmit={async (item) => {
                const res = await addModerator({
                  variables: {
                    communityId: id,
                    userId: item.id,
                  },
                  update: (cache, { data }) => {
                    const existing: any = cache.readQuery({
                      query: GET_COMMUNITY_MODERATORS,
                      variables: { communityId: id },
                    });

                    const newModerator = data?.addModerator;
                    cache.writeQuery({
                      query: GET_COMMUNITY_MODERATORS,
                      variables: { communityId: id },
                      data: {
                        getCommunityModerators: [
                          ...(existing?.getCommunityModerators || []),
                          newModerator,
                        ],
                      },
                    });
                  },
                });
              }}
            />
            <Card withBorder mt="md">
              {moderators && moderators.getCommunityModerators.length > 0 ? (
                <TableSelection
                  communityId={id}
                  data={(moderators && moderators.getCommunityModerators) || []}
                />
              ) : (
                <Card>
                  <Text>
                    There is no moderators yet for{" "}
                    <Text fw="bold" span>
                      {name}
                    </Text>{" "}
                    community.
                  </Text>
                </Card>
              )}
            </Card>
          </>
        }
      />

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
      <Divider color="red" label="Danger zone" my="md" />
      {/* <FormLayout
        layout={"horizontal"}
        label={"Transfer Ownership"}
        description={
          "Transfer ownership of the community to another moderator."
        }
        input={
          <Button
            fullWidth
            type="reset"
            color="orange"
            variant="light"
            leftIcon={<IconArrowsTransferUp size={16} />}
          >
            Transfer Ownership
          </Button>
        }
      /> */}
      <FormLayout
        layout={"horizontal"}
        label={"Delete Community"}
        description={
          "By deleting the community, you will lose all the data associated with it. This action is irreversible."
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
                  leftIcon={isDeleting && <Loader size="xs" />}
                  onClick={async () => {
                    setIsDeleting(true);
                    try {
                      await deleteCommunity({
                        variables: { id: id },
                        update: (cache) => {
                          cache.evict({
                            id: cache.identify({
                              __typename: "Community",
                              id: id,
                            }),
                          });
                        },
                      });
                      notifications.show({
                        title: "Community deleted",
                        message: `The community ${name} has been deleted.`,
                        color: "green",
                        icon: <IconCheck size={18} />,
                      });
                      // router.push("/");
                    } catch (err: any) {
                      notifications.show({
                        title: "An error occurred.",
                        message: err.message,
                        color: "red",
                        icon: <IconAlertCircle size={18} />,
                      });
                    } finally {
                      setIsDeleting(false);
                      deleteForm.reset();
                      close();
                    }
                  }}
                >
                  Yes I&apos;m sure - Delete Community
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
