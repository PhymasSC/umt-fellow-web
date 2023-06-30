import { Anchor, Card, Loader, TypographyStylesProvider } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CommentControl, SingleComment } from ".";
import { GET_COMMENTS_BY_PARENT_ID } from "@operations/queries";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

type Comment = {
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
};

type CommentProps = {
  data: Comment;
  author: string;
};

const NestedComment = (props: CommentProps) => {
  const { data: comment, author } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [nestedComment, setNestedComment] = useState<Comment[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [getComments] = useLazyQuery(GET_COMMENTS_BY_PARENT_ID);
  const [expandLoading, setExpandLoading] = useState(false);

  const handleSeeMore = async (id: string) => {
    setExpandLoading(true);
    const res = await getComments({
      variables: {
        parentId: id,
      },
    });

    setExpanded(true);
    setExpandLoading(false);
    setNestedComment((prev) => [...prev, ...res.data.getCommentsByParentId]);
  };

  return (
    <SingleComment data={comment} author={author}>
      <CommentControl
        mutation={{
          threadId: id?.[0] || "",
          parentId: comment.id,
        }}
      />
      {comment.replies.map((child) => (
        <Card
          w="99%"
          key={child.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? `${theme.colors.dark[9]}44`
                : `${theme.colors.gray[0]}44`,
          })}
          withBorder
        >
          <SingleComment data={child} author={author}>
            <CommentControl
              mutation={{
                threadId: id?.[0] || "",
                parentId: child.id,
              }}
            />

            {child.replies.map((child) => (
              <Card
                w="100%"
                key={child.id}
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? `${theme.colors.dark[9]}44`
                      : `${theme.colors.gray[0]}44`,
                })}
                withBorder
              >
                <SingleComment data={child} author={author}>
                  <CommentControl
                    mutation={{
                      threadId: id?.[0] || "",
                      parentId: child.id,
                    }}
                  />
                  {nestedComment &&
                    nestedComment.map((child) => (
                      <Card
                        w="100%"
                        key={child.id}
                        sx={(theme) => ({
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? `${theme.colors.dark[9]}44`
                              : `${theme.colors.gray[0]}44`,
                        })}
                        withBorder
                      >
                        <NestedComment data={child} author={author} />
                      </Card>
                    ))}
                  {!expanded &&
                    ((!expandLoading && (
                      <Anchor onClick={() => handleSeeMore(child.id)}>
                        See more...
                      </Anchor>
                    )) || <Loader size="xs" />)}
                </SingleComment>
              </Card>
            ))}
          </SingleComment>
        </Card>
      ))}
    </SingleComment>
  );
};

export default NestedComment;
