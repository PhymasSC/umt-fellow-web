import { Button, Group, Menu, Stack } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconEdit,
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
        <Menu>
          <Menu.Target>
            <Button variant="default" leftIcon={<IconShare size={18} />}>
              Share
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconBrandFacebook size={16} />}
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer.php?u=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to Facebook
            </Menu.Item>
            <Menu.Item
              icon={<IconBrandTwitter size={16} />}
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to Twitter
            </Menu.Item>

            <Menu.Item
              icon={<IconBrandLinkedin size={16} />}
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to LinkedIn
            </Menu.Item>

            <Menu.Item
              icon={<IconBrandWhatsapp size={16} />}
              onClick={() =>
                window.open(
                  `https://api.whatsapp.com/send?text=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to WhatsApp
            </Menu.Item>

            <Menu.Item
              icon={<IconBrandMessenger size={16} />}
              onClick={() =>
                window.open(
                  `https://www.messenger.com/share/?u=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to Messenger
            </Menu.Item>

            <Menu.Item
              icon={<IconBrandTelegram size={16} />}
              onClick={() =>
                window.open(
                  `https://t.me/share/url?url=${window.location.href}`,
                  "_blank"
                )
              }
            >
              Share to Telegram
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* {session && (
          <Button variant="default" leftIcon={<IconFlag3 size={18} />}>
            Report
          </Button>
        )} */}
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
