import { useRouter } from "next/router";
import {
  Image,
  Container,
  Avatar,
  Center,
  Grid,
  Card,
  Text,
  Title,
  Group,
  Tooltip,
  Space,
  TypographyStylesProvider,
} from "@mantine/core";
import { Comment, Feed, Typography } from "@components/index";
import Link from "next/link";
import { IconCake } from "@tabler/icons";
import { useSession } from "next-auth/react";
import {
  GET_THREADS,
  GET_COMMUNITY_BY_ID,
  GET_THREADS_BY_COMMUNITY,
} from "@operations/queries";
import { client } from "@lib/apollo-client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

type CommunityProps = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    created_at: string;
    updated_at: string;
    creatorId: {
      id: string;
      name: string;
      image: string;
    };
  };
};
const Community: NextPage<CommunityProps> = (props) => {
  const { data } = props;
  const {
    loading,
    error,
    data: threadsData,
  } = useQuery(GET_THREADS_BY_COMMUNITY, {
    variables: { communityId: props.data.id },
  });
  const { data: session } = useSession();
  const [createdDate, setCreatedDate] = useState("");
  const router = useRouter();
  const id =
    (Array.isArray(router.query.id)
      ? parseInt(router.query.id[0])
      : parseInt(router.query.id || "")) || 0;

  useEffect(() => {
    setCreatedDate(new Date(data.created_at).toLocaleDateString());
  }, [data]);

  return (
    <Container fluid>
      <Image
        src={`https://ik.imagekit.io/umtfellow/tr:w-1500/${data.banner}`}
        alt={data.name}
        width="100%"
        height="30vh"
        fit="cover"
        radius="md"
      />
      <Center>
        <Avatar
          src={`https://ik.imagekit.io/umtfellow/tr:w-300/${data.avatar}`}
          sx={{
            display: "relative",
            top: "-5em",
            left: "1em",
            width: "10em",
            height: "10em",
            borderRadius: "99em",
          }}
        />
      </Center>
      <Grid>
        <Grid.Col span={8}>
          <Container>
            {session && (
              <>
                <Comment
                  author={{
                    name: session?.user.name || "",
                    image: session?.user.image || "",
                  }}
                />
                <Space h="2em" />
              </>
            )}
            {threadsData?.getThreadsByCommunity?.length === 0 ? (
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
                  Let&apos;s get this forum started! Start a thread and see who
                  joins in.{" "}
                </Text>
              </Card>
            ) : (
              <Feed
                feeds={threadsData?.getThreadsByCommunity}
                loading={loading}
              />
            )}
          </Container>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder>
            <Title mb={5}>{data.name || ""}</Title>
            <Title mb={10} order={3} size="sm" color="dimmed">
              About Community
            </Title>
            <TypographyStylesProvider>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.replaceAll(/\n/g, "<br/>"),
                }}
              />
            </TypographyStylesProvider>
            <Text>
              <Group>
                <Text fw={800}>Created by:</Text>
                <Tooltip label={data.creatorId.name}>
                  <span>
                    <Link href={`/profile/${data.creatorId.id}`} passHref>
                      <Avatar
                        component="a"
                        src={data.creatorId.image}
                        alt={data.creatorId.name}
                        radius="xl"
                      />
                    </Link>
                  </span>
                </Tooltip>
              </Group>
            </Text>

            <Text fw={800} mb={10}>
              Admins:
            </Text>
            <Tooltip label={data.creatorId.name}>
              <Avatar
                src={data.creatorId.image}
                alt={data.creatorId.name}
                radius="xl"
              />
            </Tooltip>
            <Text fw={800} mb={10}>
              Moderators:
            </Text>
            {/* {COMMUNITIES[id - 1]?.members
              ?.filter((member) => member.role === "Moderator")
              .map((member) => (
                <Tooltip key={member.id} label={member.name}>
                  <Avatar src={member.avatar} alt={member.name} radius="xl" />
                </Tooltip>
              ))}
            <Text fw={800} mb={10}>
              Members:
            </Text>
            <Avatar.Group spacing="xs">
              {COMMUNITIES[id - 1]?.members?.map((member) => (
                <Tooltip key={member.id} label={member.name}>
                  <Avatar src={member.avatar} alt={member.name} radius="xl" />
                </Tooltip>
              ))}
              <Avatar radius="xl">+99</Avatar>
            </Avatar.Group> */}

            <Group mt={20} align="center">
              <IconCake />
              <Text>Created on {createdDate}</Text>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    let res = await client.query({
      query: GET_COMMUNITY_BY_ID,
      variables: { id: id },
    });

    console.log(res);
    return {
      props: {
        data: res?.data?.getCommunityById,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      notFound: true,
    },
  };
}

export default Community;
