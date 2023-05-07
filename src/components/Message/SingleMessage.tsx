import { Flex, Avatar, Image, Space, Title, Text, Box } from "@mantine/core";

interface SingleMessageProps {
  name: string;
  message: string;
  avatar: string;
  isSelected: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  name,
  message,
  avatar,
  isSelected,
}) => {
  return (
    <Box
      sx={(theme) => ({
        textDecoration: "none",
        color: `${
          isSelected
            ? theme.colorScheme === "dark"
              ? theme.colors.dark
              : theme.colors.dark
            : "inherit"
        }`,
        backgroundColor: `${
          isSelected &&
          (theme.colorScheme === "dark"
            ? theme.colors.gray[8]
            : theme.colors.blue[1])
        }`,
        borderRadius: ".3em",
      })}
    >
      <Flex align="center" p="xs">
        <Avatar size="md" radius="xl">
          <Image src={avatar} alt="" />
        </Avatar>
        <Space w="md" />
        <Flex direction="column" justify="center">
          <Title order={2} fz="sm">
            {name}
          </Title>
          <Text color="dimmed" fz="xs">
            {message}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleMessage;
