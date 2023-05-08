import { MessageList, Chatroom } from "@components/index";
import { Title, Paper, Flex, TextInput, Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useRouter } from "next/router";

const Message = () => {
  const router = useRouter();
  const { id } = router.query;

  const data = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey, how are you?",
      avatar: "https://picsum.photos/100",
      isSelected: id == "1",
    },
    {
      id: 2,
      name: "Jane Doe",
      message: "I'm fine, thanks.",
      avatar: "https://picsum.photos/101",
      isSelected: id == "2" && true,
    },
    {
      id: 3,
      name: "David Khor",
      message: "Is this a real life?",
      avatar: "https://picsum.photos/102",
      isSelected: id == "3" && true,
    },
    {
      id: 4,
      name: "Amanda Tan",
      message: "Is this just fantasy?",
      avatar: "https://picsum.photos/103",
      isSelected: id == "4" && true,
    },
    {
      id: 5,
      name: "John Doe",
      message: "Caught in a landslide",
      avatar: "https://picsum.photos/104",
      isSelected: id == "5" && true,
    },
  ];
  return (
    <Grid h="calc(100vh - 5rem)" grow>
      <Grid.Col h="100%" md={1}>
        <Paper
          h="100%"
          withBorder
          p={20}
          sx={{
            overflow: "scroll",
          }}
        >
          <Flex direction="column" gap="md">
            <Title order={2} fz="md">
              Messages
            </Title>
            <TextInput
              placeholder="Search user"
              icon={<IconSearch size={14} />}
            />

            <MessageList data={data} />
          </Flex>
        </Paper>
      </Grid.Col>
      <Grid.Col h="calc(100vh - 5rem)" md={8}>
        {(id && <Chatroom />) || (
          <Title align="center">
            Select a conversation or start a new one!
          </Title>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Message;
