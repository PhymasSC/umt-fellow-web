import { useRouter } from "next/router";
import { COMMUNITIES } from "@constants/communities";
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
} from "@mantine/core";
import { Comment, Feed } from "@components/index";
import Link from "next/link";
import { IconCake } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_THREADS } from "@operations/queries";

const Community = () => {
  const { loading, error, data } = useQuery(GET_THREADS);
  const { data: session } = useSession();
  const router = useRouter();
  const id =
    (Array.isArray(router.query.id)
      ? parseInt(router.query.id[0])
      : parseInt(router.query.id || "")) || 0;
  console.log(id);
  console.log(COMMUNITIES?.[id - 1]);
  return (
    <Container fluid>
      <Image
        src={COMMUNITIES?.[id - 1].cover}
        alt={COMMUNITIES?.[id - 1].name}
        width="100%"
        height="30vh"
        fit="cover"
        radius="md"
      />
      <Center>
        <Avatar
          src={COMMUNITIES?.[id - 1].avatar}
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
            <Comment
              author={{
                name: session?.user.name || "",
                image: session?.user.image || "",
              }}
            />
            <Space h="2em" />
            <Feed feeds={data}></Feed>
          </Container>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder>
            <Title mb={5}>{COMMUNITIES?.[id - 1].name || ""}</Title>
            <Title mb={10} order={3} size="sm" color="dimmed">
              About Community
            </Title>
            <Text>{COMMUNITIES[id - 1].description}</Text>
            <Text>
              <Group>
                <Text fw={800}>Created by:</Text>
                <Link href={`/profile/`} passHref>
                  <Text component="a">{COMMUNITIES[id - 1].creator}</Text>
                </Link>
              </Group>
            </Text>

            <Text fw={800} mb={10}>
              Admins:
            </Text>
            {COMMUNITIES[id - 1]?.members
              ?.filter((member) => member.role === "Admin")
              .map((member) => (
                <Tooltip key={member.id} label={member.name}>
                  <Avatar src={member.avatar} alt={member.name} radius="xl" />
                </Tooltip>
              ))}
            <Text fw={800} mb={10}>
              Moderators:
            </Text>
            {COMMUNITIES[id - 1]?.members
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
            </Avatar.Group>

            <Group mt={20} align="center">
              <IconCake />
              <Text>
                Created on{" "}
                {new Date(COMMUNITIES[id - 1].createdAt).toLocaleDateString()}
              </Text>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Community;
