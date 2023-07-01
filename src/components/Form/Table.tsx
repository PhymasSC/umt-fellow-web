import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  ActionIcon,
  Button,
} from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons";
import Link from "next/link";

interface TableSelectionProps {
  data: {
    avatar: string;
    name: string;
    id: string;
  }[];
}

const TableSelection = ({ data }: TableSelectionProps) => {
  const rows = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <Group spacing="sm">
            <Link href={`/profile/${item.id}`} passHref>
              <Avatar size={26} src={item.avatar} radius={26} component="a" />
            </Link>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>row</td>

        <td>
          <Group spacing="xs">
            <Button variant="light" color="red">
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
