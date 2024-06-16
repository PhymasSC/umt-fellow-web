import { CommunityList, NewCommunity } from "@/components/index";
import {
  Button,
  Container,
  Flex,
  Title,
  Modal,
  useMantineTheme,
  Card,
  Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { getSession, useSession, GetSessionParams } from "next-auth/react";
import { useRouter } from "next/router";
import { client } from "@/lib/apollo-client";
import {
  GET_COMMUNITIES,
  GET_COMMUNITIES_FOLLOWED_BY_USER,
} from "@/operations/queries";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

type CommunitiesProps = {
  communities: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    creatorId: {
      id: string;
    };
    isJoined: boolean;
  }[];
};

const Communities: NextPage<CommunitiesProps> = ({ communities }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const router = useRouter();
  // const { loading, error, data } = useQuery(GET_COMMUNITIES_FOLLOWED_BY_USER, {
  //   variables: {
  //     userId: session?.user?.id || "",
  //   },
  // });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <Container fluid>
      {session && (
        <Modal
          opened={opened}
          onClose={close}
          centered
          size="75vw"
          title={
            <Title order={2} size="h4">
              Create Community
            </Title>
          }
          overlayProps={{
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
        >
          <NewCommunity />
        </Modal>
      )}
      <Flex justify="space-between">
        <Title order={1} size="h3" mb="md">
          Community List
        </Title>
        <Button
          rightIcon={<IconPlus size={16} />}
          onClick={() => {
            session?.user ? open() : router.push("/login");
          }}
        >
          Create
        </Button>
      </Flex>
      {communities.length === 0 ? (
        <Card
          withBorder
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            minHeight: "8em",
          }}
        >
          <Text
            size="lg"
            fw="bold"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          >
            Let&apos;s get this forum started! Create the first community ever
            in this platform!
          </Text>
        </Card>
      ) : (
        <CommunityList communities={communities} />
      )}
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  const user = session?.user;
  try {
    const { data } = await client.query({
      query: GET_COMMUNITIES,
      variables: {
        userId: user?.id || "",
      },
    });
    return {
      props: {
        communities: data.getCommunities,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: "An error occurred",
    },
  };
};

export default Communities;
