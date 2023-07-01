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
  Accordion,
  List,
} from "@mantine/core";
import { Comment, Feed, Footer } from "@components/index";
import Link from "next/link";
import { IconCake } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { GET_COMMUNITY_BY_ID } from "@operations/queries";
import { client } from "@lib/apollo-client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type CommunityProps = {
  data: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    created_at: string;
    updated_at: string;
    threads: {
      id: string;
      title: string;
      description: string;
      images: {}[];
      tags: null;
      author: {
        id: string;
        name: string;
        image: string;
        email: string;
      };
    }[];
    rules: {
      id: string;
      rule: string;
      description: string;
    }[];
    creatorId: {
      id: string;
      name: string;
      image: string;
    };
    admin: {
      id: string;
      name: string;
      image: string;
    };
    moderators: {
      id: string;
      name: string;
      image: string;
    }[];
    members: {
      id: string;
      name: string;
      image: string;
    }[];
  };
};

const Profile = ({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) => {
  return (
    <Tooltip label={name}>
      <span>
        <Link href={`/profile/${id}`} passHref>
          <Avatar component="a" src={image} alt={name} radius="xl" />
        </Link>
      </span>
    </Tooltip>
  );
};

const Community: NextPage<CommunityProps> = (props) => {
  const { data } = props;
  const { data: session } = useSession();
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    setCreatedDate(new Date(data.created_at).toLocaleDateString());
  }, [data]);

  return (
    <Container fluid>
      <Image
        src={
          `https://ik.imagekit.io/umtfellow/tr:w-1500/${data.banner}` ||
          "/gray.svg"
        }
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
        <Grid.Col md={8}>
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
            {data?.threads?.length === 0 ? (
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
                  Let&apos;s get this community started! Start a thread and see
                  who joins in.{" "}
                </Text>
              </Card>
            ) : (
              // @ts-ignore
              <Feed feeds={data.threads} />
            )}
          </Container>
        </Grid.Col>
        <Grid.Col md={4}>
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
                <Profile {...data.creatorId} />
              </Group>
            </Text>

            <Text fw={800} mb={10}>
              <Group>
                <Text fw={800}>Admins:</Text>
                <Profile {...data.admin} />
              </Group>
            </Text>

            {data.moderators?.length > 0 && (
              <>
                <Text fw={800} mb={10}>
                  Moderators:
                </Text>
                <Avatar.Group spacing="xs">
                  {data.moderators?.map((moderator) => (
                    <Profile key={moderator.id} {...moderator} />
                  ))}
                </Avatar.Group>
              </>
            )}

            {data.members?.length > 0 && (
              <>
                <Text fw={800} mb={10}>
                  Members:
                </Text>
                <Avatar.Group spacing="xs">
                  {data.members?.map((member) => (
                    <Profile key={member.id} {...member} />
                  ))}
                </Avatar.Group>
              </>
            )}

            <Group mt={20} align="center">
              <IconCake />
              <Text>Created on {createdDate}</Text>
            </Group>
          </Card>

          <Card withBorder my="md">
            <Card.Section withBorder p="md">
              {data.name}&apos;s rules
            </Card.Section>
            <Card.Section p="md">
              {(data.rules.length === 0 && (
                <Text fw="bold" fs="italic">
                  This community currently has no rules enforced. Please help us
                  keep it clean and respectful by following the guidelines
                  below.
                  <Text fw="normal">
                    <List withPadding my="sm">
                      <List.Item>Be respectful of others.</List.Item>
                      <List.Item>
                        Avoid posting spam or offensive content.
                      </List.Item>
                      <List.Item>Keep your posts on-topic.</List.Item>
                      <List.Item>
                        If you see something that violates the guidelines,
                        please report it.
                      </List.Item>
                    </List>
                    We are working on adding rules to this community, but in the
                    meantime, we appreciate your help in keeping it a welcoming
                    and respectful space for everyone.
                  </Text>
                </Text>
              )) || (
                <Accordion variant="filled">
                  {data.rules?.map((rule) => (
                    <Accordion.Item value={rule.id} key={rule.id}>
                      <Accordion.Control>
                        <Text fw="bold">{rule.rule}</Text>
                      </Accordion.Control>
                      <Accordion.Panel>{rule.description}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Card.Section>
          </Card>

          <Footer />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    let res = await client.query({
      query: GET_COMMUNITY_BY_ID(5),
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
