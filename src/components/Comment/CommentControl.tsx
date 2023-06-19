import { ActionIcon, Button, Group, Stack } from "@mantine/core";
import {
  IconFlag3,
  IconMessageCircle,
  IconMessageCircleOff,
  IconShare,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Comment from "./NewComment";

type CommentControlProps = {
  mutation: {
    userId: string;
    threadId: string;
    parentId?: string;
  };
};
const CommentControl = (props: CommentControlProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <Stack>
      <Group>
        {session && (
          <Button
            variant="default"
            onClick={() => setCommentOpen(!commentOpen)}
            leftIcon={
              (commentOpen && <IconMessageCircleOff size={18} />) || (
                <IconMessageCircle size={18} />
              )
            }
          >
            Replies
          </Button>
        )}
        <Button variant="default" leftIcon={<IconShare size={18} />}>
          Share
        </Button>
        {session && (
          <Button variant="default" leftIcon={<IconFlag3 size={18} />}>
            Report
          </Button>
        )}
      </Group>

      {commentOpen && (
        <Comment
          author={{
            name: session?.user.name || "",
            image: session?.user.image || "",
          }}
          mutation={{
            userId: props?.mutation?.userId,
            threadId: props?.mutation?.threadId,
            parentId: props.mutation?.parentId || "",
          }}
          isReply
        />
      )}
    </Stack>
  );
};

export default CommentControl;
