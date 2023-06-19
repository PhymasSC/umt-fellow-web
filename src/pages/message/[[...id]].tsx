import { MessageList, Chatroom } from "@components/index";
import {
  Title,
  Paper,
  Flex,
  Grid,
  useMantineTheme,
  AutocompleteItem,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Search } from "@components/index";
import { useSession } from "next-auth/react";

const Message = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const theme = useMantineTheme();

  const selectRecipient = (item: AutocompleteItem) => {
    fetch("/api/messages/create-channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: session?.user.id,
        recipientId: item.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/message/${data.channelId}`);
      });
  };

  return (
    <Grid h="calc(100vh - 5rem)" grow>
      <Grid.Col
        h="100%"
        sm={2}
        sx={{
          [theme.fn.smallerThan("sm")]: {
            display: id ? "none" : "block",
          },
        }}
      >
        <Paper
          h="100%"
          withBorder
          p="md"
          sx={{
            overflow: "auto",
          }}
        >
          <Flex direction="column" gap="md">
            <Title order={2} fz="md">
              Messages
            </Title>
            <Search size="sm" onItemSubmit={selectRecipient} />
            <MessageList />
          </Flex>
        </Paper>
      </Grid.Col>

      <Grid.Col h="calc(100vh - 5rem)" sm={8}>
        {(id && <Chatroom />) || (
          <Title
            align="center"
            display="flex"
            h="100%"
            w="100%"
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Select a conversation or start a new one!
          </Title>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Message;
