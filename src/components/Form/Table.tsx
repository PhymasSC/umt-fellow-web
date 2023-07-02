import { useMutation } from "@apollo/client";
import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Button,
  Modal,
  useMantineTheme,
  List,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { REMOVE_MODERATOR } from "@operations/mutations";
import { IconCheck } from "@tabler/icons";
import Link from "next/link";

interface TableSelectionProps {
  communityId: string;
  data: {
    userId: {
      image: string;
      name: string;
      id: string;
    };
    created_at: string | number | Date;
  }[];
}

const TableSelection = (props: TableSelectionProps) => {
  const { data, communityId } = props;
  const theme = useMantineTheme();
  const [removeModerator] = useMutation(REMOVE_MODERATOR);
  const [opened, { open, close }] = useDisclosure(false);

  const rows = data.map((item) => {
    const removeHandler = async () => {
      const res = await removeModerator({
        variables: {
          communityId: communityId,
          userId: item.userId.id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "getCommunityModerators" });
        },
      });

      console.log(res);
      if (res.data.removeModerator) {
        notifications.show({
          title: "Success",
          message: `${item.userId.name} has been removed as a moderator`,
          color: "green",
          icon: <IconCheck size={18} />,
        });
      } else {
        notifications.show({
          title: "Error",
          message: `There was an error removing ${item.userId.name} as a moderator`,
          color: "red",
          icon: <IconCheck size={18} />,
        });
      }

      close();
    };

    return (
      <tr key={item.userId.id}>
        <td>
          <Group spacing="sm">
            <Link href={`/profile/${item.userId.id}`} passHref>
              <Avatar
                size={26}
                src={item.userId.image}
                radius={26}
                component="a"
              />
            </Link>
            <Text size="sm" weight={500}>
              {item.userId.name}
            </Text>
          </Group>
        </td>
        <td>
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>

        <td>
          <Group spacing="xs">
            <Modal
              opened={opened}
              onClose={close}
              size="lg"
              title={<Text fw="bold">Delete Moderator</Text>}
              overlayProps={{
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
              }}
              centered
            >
              <Modal.Body>
                Are you sure you want to delete{" "}
                <Text fw="bold" span>
                  {item.userId.name}
                </Text>{" "}
                as a moderator?
                <List>
                  <List.Item>
                    This user will no longer have the ability to remove comments
                    or threads in the community.
                  </List.Item>
                </List>
                Click{" "}
                <Text fw="bold" span>
                  Delete
                </Text>{" "}
                as moderator to confirm.
                <Button color="red" mt="md" onClick={removeHandler} fullWidth>
                  Delete
                </Button>
              </Modal.Body>
            </Modal>
            <Button variant="light" color="red" onClick={open}>
              Remove as moderator
            </Button>{" "}
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Joined Community Since</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default TableSelection;
