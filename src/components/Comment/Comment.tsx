import {
  createStyles,
  Avatar,
  Paper,
  Textarea,
  Flex,
  Container,
  Button,
} from "@mantine/core";
import RichTextEditor from "./RichTextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Editor } from "@tiptap/react";

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
}

const Comment = (props: CommentProps) => {
  const { author, isReply } = props;
  const { classes } = useStyles();
  const router = useRouter();
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/thread");
  };

  const form = useForm({
    initialValues: { description: "" },
  });

  const handleEditorUpdate = ({ editor }: { editor: Editor }) => {
    form.setFieldValue("description", editor.getHTML());
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
              />
              <Button
                mt="md"
                onClick={() => {
                  console.log(form.values.description);
                }}
              >
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
