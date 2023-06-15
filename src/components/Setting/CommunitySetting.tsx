import { Stack, Group, Avatar, Title, Accordion } from "@mantine/core";
import { GET_COMMUNITIES_OWNED_BY_USER } from "@operations/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CommunitySettingForm from "./CommunitySettingForm";
import { Key } from "react";

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
        {data.getCommunitiesOwnedByUser.map((community: data, index: Key) => (
          <Accordion.Item value={community.id} key={index}>
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
              <CommunitySettingForm data={community} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
};

export default CommunitySetting;
