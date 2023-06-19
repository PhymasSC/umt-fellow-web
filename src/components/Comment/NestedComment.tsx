import { Card } from "@mantine/core";
import { CommentControl, SingleComment } from ".";

type Comment = {
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
  return (
    <SingleComment
      id={comment.user.id}
      name={comment.user.name}
      image={comment.user.image}
      created_at={comment.created_at}
      updated_at={comment.updated_at}
    >
      {comment.content}
      <CommentControl />
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
            {child.content}
            <CommentControl />

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
                  {child.content}
                  <CommentControl />
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
