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

const CommentControl = () => {
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
          isReply
        />
      )}
    </Stack>
  );
};

export default CommentControl;
