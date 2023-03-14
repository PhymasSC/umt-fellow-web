import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash, IconFlag } from "@tabler/icons";

const CommunityCardMenu: React.FC<{ isJoined: boolean; onClick: () => void }> = ({ isJoined, onClick }) => (
    <Menu>
        <Menu.Target>
            <ActionIcon>
                <IconDotsVertical />
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item
                color={isJoined ? "green" : "blue"}
                onClick={onClick}
                closeMenuOnClick={false}
            >
                {isJoined ? "Joined" : "Join"}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<IconPencil size={14} />}>
                Edit Community
            </Menu.Item>
            <Menu.Item icon={<IconTrash size={14} />}>
                Delete Community
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                color="red"
                icon={<IconFlag size={14} />}
            >
                Report
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
);

export default CommunityCardMenu;