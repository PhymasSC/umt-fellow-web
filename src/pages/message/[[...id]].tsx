import { MessageList, Chatroom } from "@components/index";
import { Title, Paper, Flex, Grid, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { Search } from "@components/index";
const Message = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useMantineTheme();

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
            <Search size="sm" />
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
