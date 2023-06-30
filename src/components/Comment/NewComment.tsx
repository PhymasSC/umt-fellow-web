import {
  createStyles,
  Avatar,
  Paper,
  Textarea,
  Flex,
  Container,
  Button,
} from "@mantine/core";
import RichTextEditor from "../Form/RichTextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Editor } from "@tiptap/react";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons";
import { ADD_COMMENT } from "@operations/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { COMMENT_RECURSIVE_FRAGMENT } from "@operations/queries";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentProps {
  isReply?: boolean;
  author: {
    name: string;
    image: string;
  };
  mutation?: {
    userId: string;
    threadId: string;
    parentId?: string;
  };
}

const Comment = (props: CommentProps) => {
  const { author, isReply } = props;
  const { classes } = useStyles();
  const router = useRouter();
  const [addComment] = useMutation(ADD_COMMENT);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/thread");
  };

  const form = useForm({
    initialValues: {
      description: "",
      plainDescription: "",
    },
  });

  const validateComment = (comment: string): boolean => {
    const minLength = 1;
    const trimmedComment = comment.trim();

    if (trimmedComment.length < minLength) return false;

    if (!trimmedComment) return false;

    return true;
  };

  const handleEditorUpdate = ({ editor }: { editor: Editor }) => {
    form.setFieldValue("description", editor.getHTML());
    form.setFieldValue("plainDescription", editor.getText());
  };

  const clearContext = (editor: Editor) => {
    editor.commands.setContent("");
    editor.commands.clearContent();
  };

  const submitComment = async () => {
    if (!validateComment(form.values.plainDescription)) {
      notifications.show({
        title: "Comment should not be empty",
        message: "Please write something before submitting.",
        color: "red",
        icon: <IconAlertTriangle />,
      });
      return;
    }

    setLoading(true);
    const variables = {
      userId: props?.mutation?.userId,
      threadId: props?.mutation?.threadId,
      content: form.values.description,
      parentId: props.mutation?.parentId || "",
    };

    const response = await addComment({
      variables,
      update: (cache, { data }) => {
        const newComment = data?.addComment;
        if (!newComment) return;

        cache.modify({
          fields: {
            getComments(existingComments = []) {
              const newCommentRef = cache.writeFragment({
                data: newComment,
                fragment: COMMENT_RECURSIVE_FRAGMENT,
                fragmentName: "CommentsRecursive",
              });

              return [newCommentRef, ...existingComments];
            },
          },
        });
      },
    });
    form.setValues({
      description: "",
      plainDescription: "",
    });
    if (response.data) {
      notifications.show({
        title: "Comment added successfully",
        message: "Your comment has been added successfully.",
        color: "green",
        icon: <IconAlertTriangle />,
      });
    }
    setLoading(false);
  };

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Flex
        gap="md"
        justify="flex-start"
        align={isReply ? "flex-start" : "center"}
      >
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <Container
          sx={{
            width: "100%",
          }}
          fluid
        >
          {isReply ? (
            <>
              <RichTextEditor
                content={form.values.description}
                onUpdate={handleEditorUpdate}
                placeholder="What's your thoughts?"
              />
              <Button mt="md" onClick={submitComment} loading={loading}>
                Comment
              </Button>
            </>
          ) : (
            <Link href="/thread">
              <Textarea
                radius="xl"
                placeholder="What's in your mind?"
                autosize
                maxRows={1}
                onFocus={handleSubmit}
                onChange={handleSubmit}
              />
            </Link>
          )}
        </Container>
      </Flex>
    </Paper>
  );
};

export default Comment;
