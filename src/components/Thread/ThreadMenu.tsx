import { useMutation } from "@apollo/client";
import { ActionIcon, Anchor, CopyButton, Group, Menu } from "@mantine/core";
import { DELETE_THREAD } from "@operations/mutations";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconCheck,
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconFlag,
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
}

const FeedSetting: React.FC<FeedSettingProps> = ({ author, feedId }) => {
  const router = useRouter();
  const [deleteThread] = useMutation(DELETE_THREAD);
  const { data: session } = useSession();

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
              <Menu.Item icon={<IconTrash size={16} />} onClick={removeThread}>
                Delete thread
              </Menu.Item>
              <Menu.Divider />
            </>
          )}
          <CopyButton value={window.location.href} timeout={2000}>
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

          {/* <Menu.Item color="red" icon={<IconFlag size={16} />}>
            Report
          </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default FeedSetting;
