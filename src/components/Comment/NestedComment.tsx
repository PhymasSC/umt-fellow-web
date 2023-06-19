import { Card, TypographyStylesProvider } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CommentControl, SingleComment } from ".";

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
};

const NestedComment = (props: CommentProps) => {
  const { data: comment } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  return (
    <SingleComment
      id={comment.user.id}
      name={comment.user.name}
      image={comment.user.image}
      created_at={comment.created_at}
      updated_at={comment.updated_at}
    >
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </TypographyStylesProvider>
      <CommentControl
        mutation={{
          userId: session?.user.id || "",
          threadId: id?.[0] || "",
          parentId: comment.id,
        }}
      />
      {comment.replies.map((child, index) => (
        <Card
          w="99%"
          key={child.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? `${theme.colors.dark[9]}22`
                : `${theme.colors.gray[0]}22`,
          })}
          withBorder
        >
          <SingleComment
            id={child.user.id}
            name={child.user.name}
            image={child.user.image}
            created_at={child.created_at}
            updated_at={child.updated_at}
          >
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: child.content }} />
            </TypographyStylesProvider>
            <CommentControl
              mutation={{
                userId: session?.user.id || "",
                threadId: id?.[0] || "",
                parentId: child.id,
              }}
            />

            {child.replies.map((child, index) => (
              <Card
                w="100%"
                key={child.id}
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? `${theme.colors.dark[9]}22`
                      : `${theme.colors.gray[0]}22`,
                })}
                withBorder
              >
                <SingleComment
                  id={child.user.id}
                  name={child.user.name}
                  image={child.user.image}
                  created_at={child.created_at}
                  updated_at={child.updated_at}
                >
                  <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: child.content }} />
                  </TypographyStylesProvider>
                  <CommentControl
                    mutation={{
                      userId: session?.user.id || "",
                      threadId: id?.[0] || "",
                      parentId: child.id,
                    }}
                  />
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
