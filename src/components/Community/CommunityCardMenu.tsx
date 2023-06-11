import { Menu, ActionIcon, Button, Group } from "@mantine/core";
import { IconPencil, IconTrash, IconDotsVertical } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { MouseEvent } from "react";
const CommunityCardMenu: React.FC<{
  isJoined: boolean;
  onClick: () => void;
  creatorId: string;
}> = ({ isJoined, onClick, creatorId }) => {
  const { data: session } = useSession();
  return (
    <Group noWrap spacing={1}>
      <Button
        color={isJoined ? "green" : "blue"}
        sx={(theme) => ({
          borderTopRightRadius:
            session?.user.id === creatorId ? 0 : theme.radius.md,
          borderBottomRightRadius:
            session?.user.id === creatorId ? 0 : theme.radius.md,
        })}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (e.defaultPrevented) return;
          e.preventDefault();
          onClick();
        }}
      >
        {" "}
        {isJoined ? "Unfollow" : "Follow"}
      </Button>
      {session?.user.id === creatorId && (
        <Menu withinPortal>
          <Menu.Target>
            <ActionIcon
              variant="filled"
              color={isJoined ? "green" : "blue"}
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
            <Menu.Item icon={<IconTrash size={14} />}>
              Delete Community
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  );
};

export default CommunityCardMenu;
