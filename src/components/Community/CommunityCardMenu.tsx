import { Menu, ActionIcon, Button, Group } from "@mantine/core";
import { IconPencil, IconTrash, IconDotsVertical } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import {
  ADD_COMMUNITY_MEMBER,
  DELETE_COMMUNITY_MEMBER,
} from "@operations/mutations";
import { useMutation } from "@apollo/client";

const CommunityCardMenu: React.FC<{
  communityId: string;
  isJoined: boolean;
  creatorId: string;
}> = ({ communityId, isJoined, creatorId }) => {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(isJoined);
  const { data: session } = useSession();
  const [addCommunityMember] = useMutation(ADD_COMMUNITY_MEMBER(""));
  const [deleteCommunityMember] = useMutation(DELETE_COMMUNITY_MEMBER(""));

  return (
    <Group noWrap spacing={1}>
      <Button
        fullWidth
        color={joined ? "green" : "blue"}
        sx={(theme) => ({
          borderTopRightRadius:
            session?.user.id === creatorId ? 0 : theme.radius.md,
          borderBottomRightRadius:
            session?.user.id === creatorId ? 0 : theme.radius.md,
        })}
        onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          if (e.defaultPrevented) return;
          e.preventDefault();
          setLoading(true);
          if (!isJoined) {
            await addCommunityMember({
              variables: {
                communityId: communityId,
                userId: session?.user.id,
              },
            });
            setJoined(!joined);
          } else {
            await deleteCommunityMember({
              variables: {
                communityId: communityId,
                userId: session?.user.id,
              },
            });
            setJoined(!joined);
          }
          setLoading(false);
        }}
        loading={loading}
      >
        {" "}
        {joined ? "Unfollow" : "Follow"}
      </Button>
      {session?.user.id === creatorId && (
        <Menu withinPortal>
          <Menu.Target>
            <ActionIcon
              variant="filled"
              color={joined ? "green" : "blue"}
              size={36}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                if (e.defaultPrevented) return;
                e.preventDefault();
              }}
            >
              <IconDotsVertical size="1rem" stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconPencil size={14} />}>
              Edit Community
            </Menu.Item>
            <Menu.Item icon={<IconTrash size={14} />} color="red">
              Delete Community
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  );
};

export default CommunityCardMenu;
