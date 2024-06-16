// @ts-nocheck
import { NextPage } from "next";
import { Editor } from "@/components/index";
import { GET_COMMENTS, GET_THREAD } from "@/operations/queries";
import SingleFeed from "@/components/deprecated/Thread/SingleThread";
import Head from "next/head";
import {
  Avatar,
  Card,
  Container,
  Text,
  Paper,
  Button,
  Grid,
  Title,
  Space,
  Divider,
  Center,
} from "@mantine/core";
import Link from "next/link";
import { Comment } from "@/components/index";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { client } from "@/lib/apollo-client";
import MessageButton from "@/components/deprecated/Message/MessageButton";
import { IconMessageCircle } from "@tabler/icons";
import { NestedComment } from "@/components/deprecated/Comment";
import { useQuery } from "@apollo/client";

type ThreadPageProps = {
  getThreadById: {
    id: string;
    title: string;
    description: string;
    community: {
      id: string;
      name: string;
      avatar: string;
      moderators: {
        id: string;
      }[];
      admin: {
        id: string;
      };
    };
    images: {
      id: string;
      imageUrl: string;
    }[];
    tags: string[];
    author: {
      id: string;
      name: string;
      image: string;
      email: string;
    };
    flag: string;
    created_at: string;
    updated_at: string;
  };
};

type CommentProps = {
  getComments: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
    content: string;
    created_at: string;
    updated_at: string;
    replies: {
      id: string;
      user: {
        id: string;
        name: string;
        image: string;
      };
      content: string;
      created_at: string;
      updated_at: string;
      replies: {
        id: string;
        user: {
          id: string;
          name: string;
          image: string;
        };
        content: string;
        created_at: string;
        updated_at: string;
      }[];
    }[];
  }[];
};
const ThreadPage: NextPage<ThreadPageProps & CommentProps> = (props) => {
  const router = useRouter();
  const { id, edit } = router.query;
  const { data: session } = useSession();
  const { getThreadById: data } = props;
  const { data: comments } = useQuery(GET_COMMENTS, {
    variables: { threadId: id?.[0] },
  });

  if (id === undefined) {
    return (
      <Container>
        <Editor />
      </Container>
    );
  }
  // Edit mode
  if (
    edit != undefined &&
    //@ts-ignore
    session?.user.id === data?.author?.id
  ) {
    return (
      <Container>
        <Editor data={data} />
      </Container>
    );
  }
  // View mode
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        {/* <title>{data?.title} | UMT Fellow</title> */}
        <meta
          property="og:url"
          content={`https://www.umtfellow.social${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UMT Fellow" />
        <meta
          property="og:description"
          content={`${data?.title} | UMT Fellow is a social forum built for University Malaysia Terengganu.`}
        />
        <meta
          property="og:image"
          content="https://www.umtfellow.social/logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="umtfellow.social" />
        <meta
          property="twitter:url"
          content={`https://www.umtfellow.social${router.asPath}`}
        />
        <meta name="twitter:title" content="UMT Fellow" />
        <meta
          name="twitter:description"
          content={`${data?.title} | UMT Fellow is a social forum built for University Malaysia Terengganu.`}
        />
        <meta
          name="twitter:image"
          content="https://www.umtfellow.social/logo.png"
        />
      </Head>
      <Container size="xl">
        <Grid>
          <Grid.Col xs={12}>
            <Grid>
              <Grid.Col xs={12} lg={8}>
                <Card sx={{ overflow: "visible" }} withBorder>
                  <SingleFeed feed={data} loading={false} isStandalone />
                </Card>
              </Grid.Col>
              <Grid.Col xs={12} lg={4}>
                {data && data.community && (
                  <Paper
                    radius="md"
                    withBorder
                    p="lg"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.white,
                    })}
                    mb="md"
                  >
                    <Title order={4}>Community</Title>
                    <Space h="md" />
                    <Avatar
                      src={`https://ik.imagekit.io/umtfellow/tr:h-600${data?.community.avatar}`}
                      size={120}
                      radius={120}
                      mx="auto"
                    />
                    <Text align="center" size="lg" weight={500} mt="md">
                      {data?.community.name}
                    </Text>

                    <Link href={`/community/${data?.community.id}`} passHref>
                      <Button component="a" variant="light" fullWidth mt="md">
                        View community
                      </Button>
                    </Link>
                  </Paper>
                )}
                <Paper
                  radius="md"
                  withBorder
                  p="lg"
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.white,
                  })}
                >
                  <Title order={4}>Thread Starter</Title>
                  <Space h="md" />
                  <Avatar
                    src={data?.author.image}
                    size={120}
                    radius={120}
                    mx="auto"
                  />
                  <Text align="center" size="lg" weight={500} mt="md">
                    {data?.author.name}
                  </Text>

                  <Link href={`/profile/${data?.author.id}`} passHref>
                    <Button component="a" variant="light" fullWidth mt="md">
                      View profile
                    </Button>
                  </Link>
                  {session && session.user.id !== data?.author.id && (
                    <MessageButton
                      fullWidth
                      leftIcon={<IconMessageCircle size={18} />}
                      component={Button}
                      recipientId={data?.author.id}
                      senderId={session?.user.id || ""}
                    />
                  )}
                </Paper>
              </Grid.Col>
            </Grid>

            <Space h="xl" />
            <Divider />
            <Space h="xl" />
            {session && (
              <Comment
                isReply
                author={{
                  name: session?.user.name || "",
                  image: session?.user.image || "",
                }}
                mutation={{
                  threadId: data?.id || "",
                }}
              />
            )}
            <Space h="xl" />
            {comments &&
              comments.getComments.length > 0 &&
              console.log(comments)}
            {comments && comments.getComments.length > 0 ? (
              <Card withBorder>
                {
                  //@ts-ignore
                  comments.getComments.map((comment) => (
                    <Card.Section key={comment.id} withBorder>
                      <NestedComment
                        key={comment.id}
                        data={comment}
                        author={data.author.id}
                        community={data.community}
                      />
                    </Card.Section>
                  ))
                }
              </Card>
            ) : (
              <Center>
                <Title>No comments yet</Title>
              </Center>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = Array.isArray(context.params.id)
    ? context.params.id[0]
    : context.params.id;
  if (!id)
    return {
      props: {},
    };
  try {
    const { data } = await client.query({
      query: GET_THREAD,
      variables: { id },
    });
    console.log(data);
    if (!data.getThreadById)
      return {
        notFound: true,
      };
    return {
      props: { ...data },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    notFound: true,
  };
}

export default ThreadPage;
