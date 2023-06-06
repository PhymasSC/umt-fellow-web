import { Feed, Typography } from "@components/index";
import {
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Footer, Comment } from "@components/index";
import { IconTestPipe2 } from "@tabler/icons";
import Link from "next/link";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_THREADS } from "@operations/queries";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(GET_THREADS, {
    pollInterval: 1000,
  });

  return (
    <>
      <Grid>
        <Grid.Col xs={12} lg={8}>
          <Flex gap="md" direction="column">
            {session && (
              <Comment
                author={{
                  name: session?.user?.name || "",
                  image: session?.user?.image || "",
                }}
              />
            )}
            {(data?.getThreads.length === 0 && (
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
            )) || <Feed feeds={data} loading={loading} />}
          </Flex>
        </Grid.Col>
        <Grid.Col xs={12} lg={4}>
          <Footer />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Home;
