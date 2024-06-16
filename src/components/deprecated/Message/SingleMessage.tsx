import { Flex, Avatar, Image, Space, Text, Box } from "@mantine/core";
import { useSession } from "next-auth/react";

interface SingleMessageProps {
  name: string;
  message: string;
  avatar: string;
  isSelected: boolean;
  lastSender?: {
    id: string;
    name: string;
  };
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  name,
  message,
  avatar,
  isSelected,
  lastSender,
}) => {
  const { data: session } = useSession();
  return (
    <Box
      sx={(theme) => ({
        borderRadius: ".3em",
        backgroundColor: `${
          isSelected &&
          (theme.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[0])
        }`,
        "&:hover": {
          backgroundColor: `${
            theme.colorScheme === "dark"
              ? theme.colors.gray[9]
              : theme.colors.gray[0]
          }`,
        },
      })}
    >
      <Flex align="center" p="xs" w="100%">
        <Avatar size="md" radius="xl">
          <Image src={avatar} alt={`Profile picture of ${name}`} />
        </Avatar>
        <Space w="md" />
        <Flex direction="column" justify="center" w="100%">
          <Text fw={500} fz="sm">
            {name}
          </Text>
          <Text color="dimmed" fz="xs" lineClamp={1}>
            {lastSender && lastSender?.id === session?.user.id && "You: "}
            {message}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleMessage;
