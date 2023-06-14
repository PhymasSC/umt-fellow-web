import {
  Stack,
  Group,
  Avatar,
  Title,
  Accordion,
  TextInput,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { KeyValueInput, FormLayout } from "../Form";
import { GET_COMMUNITIES_OWNED_BY_USER } from "@operations/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type data = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  created_at: string;
  updated_at: string;
};
const CommunitySetting = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_COMMUNITIES_OWNED_BY_USER, {
    variables: {
      userId: session?.user.id,
    },
  });

  if (loading) return <div>Loading...</div>;
  return (
    <Stack>
      <Accordion variant="contained" defaultValue={id?.[0] || ""}>
        {data.getCommunitiesOwnedByUser.map((community: data) => (
          <Accordion.Item value={community.id}>
            <Accordion.Control>
              <Group>
                <Avatar
                  src={`https://ik.imagekit.io/umtfellow/tr:w-60/${community.avatar}`}
                  size="md"
                  radius="xl"
                />
                <Title order={3}>{community.name} </Title>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <FormLayout
                layout={"vertical"}
                label={"Community Name"}
                description={"The name of the community"}
                input={
                  <TextInput
                    mt="-1em"
                    mb="1em"
                    placeholder={community.name}
                  ></TextInput>
                }
              />
              <FormLayout
                layout={"vertical"}
                label={"Community Description"}
                description={"The description of the community"}
                input={
                  <TextInput
                    mt="-1em"
                    mb="1em"
                    placeholder={community.description}
                  ></TextInput>
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
                    color="red"
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
                    fullWidth
                    color="green"
                    leftIcon={<IconPencil size={16} />}
                  >
                    Save Changes
                  </Button>
                }
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
};

export default CommunitySetting;
