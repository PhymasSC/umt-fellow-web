import { ContentLayout } from "@/components/deprecated/Layout";
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
import {
  DELETE_COMMENT,
  UPDATE_COMMENT,
  VOTE_COMMENT,
} from "@/operations/mutations";
import { useSession } from "next-auth/react";
import { GET_COMMENT_VOTES } from "@/operations/queries";
import {
  IconAlertCircle,
  IconCheck,
  IconCircleX,
  IconDotsVertical,
  IconEdit,
  IconSend,
  IconSquareRoundedX,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import RTE from "@/components/deprecated/Form/RichTextEditor";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Editor } from "@tiptap/react";

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
  children: React.ReactNode;
};

const SingleComment = (props: SingleCommentProps) => {
  const { data: commentData, author, community, children } = props;
  const { data: session } = useSession();
  const [isModifying, setIsModifying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [vote] = useMutation(VOTE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { loading, data, refetch } = useQuery(GET_COMMENT_VOTES, {
    variables: {
      commentId: commentData.id,
    },
  });
  const form = useForm({
    initialValues: {
      content: commentData.content,
      plainContent: commentData.content,
    },
  });

  const handleEditorUpdate = ({ editor }: { editor: Editor }) => {
    form.setFieldValue("content", editor.getHTML());
    form.setFieldValue("plainContent", editor.getText());
  };

  const submitHandler = async () => {
    if (form.values.plainContent.trim() === "") {
      notifications.show({
        title: "Error",
        message: "Comment cannot be empty.",
        color: "red",
        icon: <IconAlertCircle size="1em" />,
      });
      return;
    }
    setIsModifying(true);
    try {
      await updateComment({
        variables: {
          commentId: commentData.id,
          content: form.values.content,
        },
      });
      notifications.show({
        title: "Comment updated",
        message: "Your comment has been updated.",
        color: "teal",
        icon: <IconCheck size="1em" />,
      });
      setIsModifying(false);
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: err.message,
        color: "red",
      });
      setIsModifying(false);
    }
  };
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
            <Group spacing="apart">
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
              {community && community?.admin.id === commentData.user.id && (
                <Badge color="red">Admin</Badge>
              )}
              {community &&
                community?.moderators.find(
                  (mod) => mod.id === commentData.user.id
                ) && <Badge color="indigo">Moderator</Badge>}
            </Group>
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
          <RTE content={form.values.content} onUpdate={handleEditorUpdate} />
          <Button rightIcon={<IconSend size={16} />} onClick={submitHandler}>
            Edit
          </Button>
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
