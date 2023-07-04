import { ContentLayout } from "@components/Layout";
import {
  Button,
  Group,
  Avatar,
  Text,
  Tooltip,
  Badge,
  ActionIcon,
  Menu,
  TypographyStylesProvider,
  Loader,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_COMMENT, VOTE_COMMENT } from "@operations/mutations";
import { useSession } from "next-auth/react";
import { GET_COMMENT_VOTES } from "@operations/queries";
import {
  IconAlertCircle,
  IconCircleX,
  IconDotsVertical,
  IconEdit,
  IconSend,
  IconSquareRoundedX,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import RTE from "@components/Form/RichTextEditor";
import { notifications } from "@mantine/notifications";

type SingleCommentProps = {
  author: string;
  data: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
    content: string;
    created_at: string;
    updated_at: string;
  };
  children: React.ReactNode;
};

const SingleComment = (props: SingleCommentProps) => {
  const { data: commentData, author, children } = props;
  const { data: session } = useSession();
  const [isModifying, setIsModifying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [vote] = useMutation(VOTE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { loading, data, refetch } = useQuery(GET_COMMENT_VOTES, {
    variables: {
      commentId: commentData.id,
    },
  });

  return (
    <ContentLayout
      vote={
        <>
          {loading ? (
            <Loader size="xs" />
          ) : (
            <>{data.getCommentUpvotesAndDownvotes}</>
          )}
        </>
      }
      onUpvote={async () => {
        let res = await vote({
          variables: {
            commentId: commentData.id,
            userId: session?.user?.id,
            voteType: "UPVOTE",
          },
        });
        refetch();
      }}
      onDownvote={async () => {
        await vote({
          variables: {
            commentId: commentData.id,
            userId: session?.user?.id,
            voteType: "DOWNVOTE",
          },
        });
        refetch();
      }}
      header={
        <Group spacing="xs">
          {(commentData.user && (
            <Link href={`/profile/${commentData.user.id}`} passHref>
              <Button
                component="a"
                variant="subtle"
                h={50}
                color="gray"
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                <Group>
                  <Avatar
                    src={commentData.user.image}
                    radius="xl"
                    alt="Avatar"
                  />
                  <Text weight="700">{commentData.user.name}</Text>
                </Group>
              </Button>
            </Link>
          )) || (
            <Group>
              <Avatar src="" radius="xl" alt="Avatar" />
              <Text fs="italic">[Deleted]</Text>
            </Group>
          )}
          {commentData.user && commentData.user.id === author && (
            <Badge color="yellow">Author</Badge>
          )}
          ·
          <Tooltip
            multiline
            label={`Created at ${dayjs(
              new Date(commentData.created_at)
            ).toDate()}`}
            withArrow
            position="top"
          >
            <Text color="dimmed">
              {commentData.created_at !== commentData.updated_at
                ? (!commentData.user && "Removed ") || "Edited "
                : ""}
              {dayjs(new Date(commentData.updated_at)).fromNow()}
            </Text>
          </Tooltip>
          {session &&
            commentData.user &&
            session.user.id === commentData.user.id && (
              <Menu>
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconEdit size={18} />}
                    onClick={() => setIsModifying(!isModifying)}
                  >
                    Edit comment
                  </Menu.Item>
                  <Menu.Item
                    disabled={isDeleting}
                    color="red"
                    icon={<IconTrash size={18} />}
                    onClick={async () => {
                      setIsDeleting(true);
                      const response = await deleteComment({
                        variables: { commentId: commentData.id },
                        update: (cache) => {
                          // @ts-ignore
                          if (commentData.replies.length === 0)
                            cache.evict({ id: cache.identify(commentData) });
                        },
                      });
                      if (response.data.deleteComment) {
                        notifications.show({
                          title: "Comment deleted",
                          message: "Your comment has been deleted.",
                          color: "green",
                          icon: <IconCircleX size={18} />,
                        });
                      } else {
                        notifications.show({
                          title: "Error",
                          message:
                            "An error occured while deleting your comment.",
                          color: "red",
                          icon: <IconAlertCircle size={18} />,
                        });
                      }

                      setIsDeleting(false);
                    }}
                  >
                    Delete comment
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
        </Group>
      }
    >
      {(isModifying && (
        <>
          <RTE content={commentData.content} onUpdate={() => {}} />
          <Button rightIcon={<IconSend size={16} />}>Edit</Button>
        </>
      )) ||
        (commentData.user && (
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: commentData.content }} />
          </TypographyStylesProvider>
        )) || (
          <Flex align="center" gap="sm">
            <IconSquareRoundedX size={18} color="gray" />
            <Text fs="italic" color="dimmed">
              [{commentData.content}]
            </Text>
          </Flex>
        )}
      {children}
    </ContentLayout>
  );
};

export default SingleComment;
