import { Table, ScrollArea, Group, Avatar, Text, Button } from "@mantine/core";
import Link from "next/link";

interface TableSelectionProps {
  data: {
    userId: {
      image: string;
      name: string;
      id: string;
    };
    created_at: string | number | Date;
  }[];
}

const TableSelection = ({ data }: TableSelectionProps) => {
  const rows = data.map((item) => {
    console.log(item);
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
