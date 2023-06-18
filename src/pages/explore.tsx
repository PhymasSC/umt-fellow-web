import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { APP_NAME } from "@constants/metadata";
import { Feed } from "@components/index";
import { useQuery } from "@apollo/client";
import { GET_THREADS } from "@operations/queries";
import { Container, Grid, Flex, Skeleton } from "@mantine/core";

const Explore: NextPage = () => {
  const { loading, error, data } = useQuery(GET_THREADS);

  return (
    <>
      <Head>
        <title>Explore | {APP_NAME}</title>
      </Head>
      <Container
        m="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        fluid
      >
        <Grid>
          <Container>
            <Flex mih={50} gap="md" direction="column" wrap="wrap">
              {loading ? (
                <Skeleton sx={(theme) => ({ width: "100%" })}>
                  Page is loading
                </Skeleton>
              ) : (
                <Feed feeds={data.getThreads} />
              )}
            </Flex>
          </Container>
        </Grid>
      </Container>
    </>
  );
};

export default Explore;
