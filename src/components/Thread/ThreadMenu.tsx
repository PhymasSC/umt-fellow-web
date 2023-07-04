import { useMutation } from "@apollo/client";
import { ActionIcon, Anchor, CopyButton, Group, Menu } from "@mantine/core";
import { DELETE_THREAD } from "@operations/mutations";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconCheck,
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface FeedSettingProps {
  feedId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    avatar: string;
    moderators: {
      id: string;
    }[];
    admin: {
      id: string;
    };
  };
}

const FeedSetting: React.FC<FeedSettingProps> = ({
  author,
  feedId,
  community,
}) => {
  const router = useRouter();
  const [deleteThread] = useMutation(DELETE_THREAD);
  const { data: session } = useSession();
  const url = `https://www.umtfellow.social${router.asPath}`;
  const removeThread = async () => {
    try {
      const res = await deleteThread({
        variables: {
          id: feedId || "",
        },
      });
      console.log("Res:", res);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Group position="center">
      <Menu>
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {session?.user.id === author.id && (
            <>
              <Link
                href={{
                  pathname: "/thread/" + feedId,
                  query: "edit",
                }}
                passHref
              >
                <Menu.Item component="a" icon={<IconEdit size={16} />}>
                  Edit thread
                </Menu.Item>
              </Link>
            </>
          )}
          {(session?.user.id === author.id ||
            (community && community.admin.id === session?.user.id) ||
            (community &&
              community.moderators.find(
                (moderator) => moderator.id === session?.user.id
              ))) && (
            <>
              <Menu.Item
                icon={<IconTrash size={16} />}
                onClick={removeThread}
                color="red"
              >
                Delete thread
              </Menu.Item>
              <Menu.Divider />
            </>
          )}
          <CopyButton value={url} timeout={2000}>
            {({ copied, copy }) => (
              <Menu.Item
                icon={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                closeMenuOnClick={false}
                color={copied ? "green" : undefined}
                onClick={copy}
              >
                {copied ? "Copied" : "Copy link"}
              </Menu.Item>
            )}
          </CopyButton>

          <Menu.Item
            icon={<IconBrandFacebook size={16} />}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer.php?u=${url}`,
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
                `https://twitter.com/intent/tweet?text=${url}`,
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
                `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
                "_blank"
              )
            }
          >
            Share to LinkedIn
          </Menu.Item>

          <Menu.Item
            icon={<IconBrandWhatsapp size={16} />}
            onClick={() =>
              window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank")
            }
          >
            Share to WhatsApp
          </Menu.Item>

          <Menu.Item
            icon={<IconBrandMessenger size={16} />}
            onClick={() =>
              window.open(`https://www.messenger.com/share/?u=${url}`, "_blank")
            }
          >
            Share to Messenger
          </Menu.Item>

          <Menu.Item
            icon={<IconBrandTelegram size={16} />}
            onClick={() =>
              window.open(`https://t.me/share/url?url=${url}`, "_blank")
            }
          >
            Share to Telegram
          </Menu.Item>

          {/* <Menu.Item color="red" icon={<IconFlag size={16} />}>
            Report
          </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default FeedSetting;
