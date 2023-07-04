import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Container,
  Stack,
  Avatar,
  Text,
  Group,
  Grid,
  Spoiler,
  Space,
  Title,
  Tooltip,
  Button,
  TypographyStylesProvider,
} from "@mantine/core";
import { Gallery, Typography } from "@components/index";
import FeedSetting from "./ThreadMenu";
import { GET_THREAD_UPVOTES_AND_DOWNVOTES } from "@operations/queries";
import { VOTE_THREAD } from "@operations/mutations";
import { useStyles } from "./SingleThread.style";
import { MouseEvent } from "react";
import SingleFeedSkeleton from "./SingleThreadSkeleton";
import { VoteButton } from "@components/Button";

interface SingleFeedProps {
  feed?: {
    title: string;
    author: {
      id: string;
      name: string;
      image: string;
    };
    images: {
      id: string;
      imageUrl: string;
    }[];
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
    created_at: string;
    updated_at: string;
    description: string;
    id: string;
  };
  loading?: boolean;
  isStandalone?: boolean;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const SingleFeed: React.FC<SingleFeedProps> = ({
  feed,
  loading,
  isStandalone = false,
}) => {
  const [votes, setVotes] = useState<number>(0);
  const [voteThread] = useMutation(VOTE_THREAD);
  const { classes } = useStyles();
  const { data: session } = useSession();

  const { loading: votesLoading, data: votesData } = useQuery(
    GET_THREAD_UPVOTES_AND_DOWNVOTES,
    {
      variables: {
        threadId: feed?.id,
      },
      // pollInterval: 500,
    }
  );

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (!votesLoading && votesData?.getThreadUpvotesAndDownvotes) {
      const upvotes = votesData.getThreadUpvotesAndDownvotes[0];
      const downvotes = votesData.getThreadUpvotesAndDownvotes[1];
      setVotes(upvotes - downvotes);
    }
  }, [votesLoading, votesData]);

  if (!feed || loading) return <SingleFeedSkeleton />;

  const { title, author, created_at, updated_at, description, id, images } =
    feed;
  const handleVote = async (type: string) => {
    const res = await voteThread({
      variables: {
        threadId: id,
        userId: session?.user?.id,
        type,
      },
    });

    if (res?.data?.voteThread) {
      const { upvotes, downvotes } = res.data.voteThread;
      setVotes(upvotes - downvotes);
    }
  };

  return (
    <Container className={classes.container} fluid>
      <Grid>
        <Grid.Col span={1}>
          <VoteButton
            onUpvote={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              handleVote("UPVOTE");
            }}
            onDownvote={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              handleVote("DOWNVOTE");
            }}
          >
            <Text>{formatter.format(votes)}</Text>
          </VoteButton>
        </Grid.Col>
        <Grid.Col span={11}>
          <Stack>
            <Group position="apart">
              <Link href={`/profile/${author.id}`} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  h={50}
                  color="gray"
                  sx={{ color: "inherit", textDecoration: "none" }}
                >
                  <Group>
                    <Avatar src={author.image} radius="xl" alt="Avatar" />
                    <Text weight="700">{author.name}</Text>
                    <Space w="xs" />
                  </Group>
                </Button>
              </Link>
              <Group>
                <Tooltip
                  multiline
                  label={`Created at ${dayjs(new Date(created_at)).toDate()}`}
                  withArrow
                  position="top"
                >
                  <Text color="dimmed">
                    {created_at !== updated_at && "Edited "}
                    {dayjs(new Date(updated_at)).fromNow()}
                  </Text>
                </Tooltip>
                <FeedSetting
                  author={author}
                  feedId={feed.id}
                  community={feed.community}
                />
              </Group>
            </Group>
            <Title size="h3" weight="600">
              {title}
            </Title>
            {(!isStandalone && (
              <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
                <TypographyStylesProvider>
                  <Typography>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </Typography>
                </TypographyStylesProvider>
              </Spoiler>
            )) || (
              <TypographyStylesProvider>
                <Typography>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Typography>
              </TypographyStylesProvider>
            )}
            {images.length > 0 && (
              <>
                <Space h="md" />
                <Gallery
                  images={images.map(
                    (image) =>
                      `https://ik.imagekit.io/umtfellow/tr:h-800/${image.imageUrl}`
                  )}
                />
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SingleFeed;
