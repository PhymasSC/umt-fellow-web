import { ContentLayout } from "@components/Layout";
import { Button, Group, Avatar, Text, Tooltip, Badge } from "@mantine/core";
import Link from "next/link";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { VOTE_COMMENT } from "@operations/mutations";
import { useSession } from "next-auth/react";
import { GET_COMMENT_VOTES } from "@operations/queries";
type SingleCommentProps = {
  id: string;
  name: string;
  image: string;
  children: React.ReactNode;
  isAuthor: boolean;
  commentId: string;
  created_at: string;
  updated_at: string;
};

const SingleComment = (props: SingleCommentProps) => {
  const {
    id,
    name,
    image,
    isAuthor,
    children,
    commentId,
    created_at,
    updated_at,
  } = props;
  const { data: session } = useSession();
  const [vote] = useMutation(VOTE_COMMENT);
  const { loading, data, refetch } = useQuery(GET_COMMENT_VOTES, {
    variables: {
      commentId: commentId,
    },
  });

  return (
    <ContentLayout
      vote={
        <>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>{data.getCommentUpvotesAndDownvotes}</>
          )}
        </>
      }
      onUpvote={async () => {
        await vote({
          variables: {
            commentId: commentId,
            userId: session?.user?.id,
            voteType: "UPVOTE",
          },
        });
        refetch();
      }}
      onDownvote={async () => {
        await vote({
          variables: {
            commentId: commentId,
            userId: session?.user?.id,
            voteType: "DOWNVOTE",
          },
        });
        refetch();
      }}
      header={
        <Group spacing="xs">
          <Link href={`/profile/${id}`} passHref>
            <Button
              component="a"
              variant="subtle"
              h={50}
              color="gray"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              <Group>
                <Avatar src={image} radius="xl" alt="Avatar" />
                <Text weight="700">{name}</Text>
              </Group>
            </Button>
          </Link>
          {isAuthor && <Badge color="yellow">Author</Badge>}·
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
        </Group>
      }
    >
      {children}
    </ContentLayout>
  );
};

export default SingleComment;
