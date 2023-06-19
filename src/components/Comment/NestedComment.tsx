import { Card } from "@mantine/core";
import { SingleComment } from ".";

type Comment = {
  user: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  replies: {
    user: {
      id: string;
      name: string;
      image: string;
    };
    content: string;
    replies: {
      user: {
        id: string;
        name: string;
        image: string;
      };
      content: string;
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
    >
      {comment.content}
      {comment.replies.map((child, index) => (
        <Card
          w="99%"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? `${theme.colors.dark[9]}22`
                : `${theme.colors.gray[0]}22`,
          })}
          withBorder
        >
          <SingleComment
            key={index}
            id={child.user.id}
            name={child.user.name}
            image={child.user.image}
          >
            {child.content}
            {child.replies.map((child, index) => (
              <Card
                w="100%"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? `${theme.colors.dark[9]}22`
                      : `${theme.colors.gray[0]}22`,
                })}
                withBorder
              >
                <SingleComment
                  key={index}
                  id={child.user.id}
                  name={child.user.name}
                  image={child.user.image}
                >
                  {child.content}
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
