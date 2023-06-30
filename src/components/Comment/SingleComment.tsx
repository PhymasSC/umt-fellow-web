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
} from "@mantine/core";
import Link from "next/link";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { VOTE_COMMENT } from "@operations/mutations";
import { useSession } from "next-auth/react";
import { GET_COMMENT_VOTES } from "@operations/queries";
import { IconDotsVertical, IconEdit, IconSend, IconTrash } from "@tabler/icons";
import { useState } from "react";
import RTE from "@components/Form/RichTextEditor";

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
  const [vote] = useMutation(VOTE_COMMENT);
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
        console.log(data);
        let res = await vote({
          variables: {
            commentId: commentData.id,
            userId: session?.user?.id,
            voteType: "UPVOTE",
          },
        });
        console.log(res);
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
          <Link href={`/profile/${commentData.user.id}`} passHref>
            <Button
              component="a"
              variant="subtle"
              h={50}
              color="gray"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              <Group>
                <Avatar src={commentData.user.image} radius="xl" alt="Avatar" />
                <Text weight="700">{commentData.user.name}</Text>
              </Group>
            </Button>
          </Link>
          {commentData.user.id === author && (
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
              {commentData.created_at !== commentData.updated_at && "Edited "}
              {dayjs(new Date(commentData.updated_at)).fromNow()}
            </Text>
          </Tooltip>
          {session && session.user.id === commentData.user.id && (
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
                <Menu.Item color="red" icon={<IconTrash size={18} />}>
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
      )) || (
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: commentData.content }} />
        </TypographyStylesProvider>
      )}
      {children}
    </ContentLayout>
  );
};

export default SingleComment;
