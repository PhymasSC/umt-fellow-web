import { NextPage } from "next";
import { Editor } from "@components/index";
import { GET_THREAD } from "@operations/queries";
import SingleFeed from "@components/Feed/SingleFeed";
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
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { Comment } from "@components/index";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

const ThreadPage: NextPage = (props) => {
  const router = useRouter();
  const { id, edit } = router.query;
  const { data: session } = useSession();
  const { loading, data } = useQuery(GET_THREAD, {
    variables: { id: id?.[0] },
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
    session?.user.id === data.getThreadById?.author?.id
  ) {
    return (
      <Container>
        <Editor data={data?.getThreadById} />
      </Container>
    );
  }

  // View mode
  return (
    <>
      <Head>
        <title>{data?.title} | UMT Fellow</title>
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
                  <SingleFeed
                    feed={data?.getThreadById}
                    loading={loading}
                  ></SingleFeed>
                </Card>
              </Grid.Col>
              <Grid.Col xs={12} lg={4}>
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
                  <Space h="md"></Space>
                  {!loading && (
                    <>
                      <Avatar
                        src={data?.getThreadById?.author.image}
                        size={120}
                        radius={120}
                        mx="auto"
                      />
                      <Text align="center" size="lg" weight={500} mt="md">
                        {data?.getThreadById?.author.name}
                      </Text>

                      <Link
                        href={`/profile/${data?.getThreadById?.author.id}`}
                        passHref
                      >
                        <Button component="a" variant="light" fullWidth mt="md">
                          View profile
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link href={`/message`} passHref>
                    <Button component="a" variant="outline" fullWidth mt="md">
                      Send a message
                    </Button>
                  </Link>
                </Paper>
              </Grid.Col>
            </Grid>

            <Space h="xl" />
            <Divider></Divider>
            <Space h="xl" />
            <Center>
              <Title>No Replies yet</Title>
            </Center>
            <Space h="xl" />
            {!loading && (
              <Comment
                author={{
                  name: data?.getThreadById?.author?.name,
                  image: data?.getThreadById?.author?.image,
                }}
              ></Comment>
            )}
          </Grid.Col>
          <Grid.Col xs={12} md={4}></Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

// export async function getServerSideProps(context: { params: { id: string } }) {
// 	const id = Array.isArray(context.params.id)
// 		? context.params.id[0]
// 		: context.params.id;
// 	if (!id)
// 		return {
// 			props: {},
// 		};
// 	try {
// 		const { data } = await client.query({
// 			query: GET_THREAD,
// 			variables: { id },
// 		});
// 		return {
// 			props: data,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	return {
// 		notFound: true,
// 	};
// }

export default ThreadPage;
