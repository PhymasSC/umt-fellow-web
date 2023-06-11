import { Menu, ActionIcon, Button, Group } from "@mantine/core";
import { IconPencil, IconTrash, IconDotsVertical } from "@tabler/icons";
import { MouseEvent } from "react";
const CommunityCardMenu: React.FC<{
  isJoined: boolean;
  onClick: () => void;
}> = ({ isJoined, onClick }) => (
  <Group noWrap spacing={1}>
    <Button
      color={isJoined ? "green" : "blue"}
      sx={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (e.defaultPrevented) return;
        e.preventDefault();
        onClick();
      }}
    >
      {" "}
      {isJoined ? "Joined" : "Join"}
    </Button>
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
        <Menu.Item icon={<IconPencil size={14} />}>Edit Community</Menu.Item>
        <Menu.Item icon={<IconTrash size={14} />}>Delete Community</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </Group>
);

export default CommunityCardMenu;
