import { ActionIcon, Group, Stack } from "@mantine/core";
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
          <ActionIcon onClick={() => setCommentOpen(!commentOpen)}>
            {(!commentOpen && <IconMessageCircle />) || (
              <IconMessageCircleOff />
            )}
          </ActionIcon>
        )}
        <ActionIcon>
          <IconShare />
        </ActionIcon>
        {session && (
          <ActionIcon>
            <IconFlag3 />
          </ActionIcon>
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
