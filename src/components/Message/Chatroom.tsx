import {
  Card,
  Flex,
  Group,
  Indicator,
  Avatar,
  Title,
  Text,
  Textarea,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import BubbleGroup from "./BubbleGroup";

type ChatroomProps = {
  id: string;
};

const Chatroom = () => {
  return (
    <Card withBorder h="100%" w="100%">
      <Grid h="100%" gutter="xs">
        <Grid.Col h="3rem">
          <Flex gap="md">
            <Group>
              <Indicator
                inline
                size={12}
                offset={7}
                position="bottom-end"
                color="green"
                withBorder
              >
                <Avatar radius="xl" size="md" src={""} />
              </Indicator>
            </Group>
            <Flex direction="column" justify="center" gap="0">
              <Title order={1} fz="lg">
                {"Lau"}
              </Title>
              <Text color="dimmed" fz="xs">
                Online
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>

        <Grid.Col h="calc(100% - 12% - 3rem)">
          <Card
            withBorder
            sx={{
              overflow: "scroll",
              maxHeight: "100%",
            }}
          >
            <Flex direction="column" gap="md">
              {/* data[parseInt(id[0]) - 1]["avatar"] */}
              <BubbleGroup
                profileUrl={""}
                profileImage={""}
                isRecipient={false}
                message={""}
              />
              <BubbleGroup
                profileUrl={""}
                profileImage={""}
                isRecipient={false}
                message={""}
              />
              <BubbleGroup
                profileUrl={""}
                profileImage={""}
                isRecipient={false}
                message={""}
              />
              <BubbleGroup
                profileUrl={""}
                profileImage={""}
                isRecipient={false}
                message={""}
              />
              <BubbleGroup
                profileUrl={""}
                profileImage={""}
                isRecipient={false}
                message={""}
              />
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col h="calc(100% - 92% - 3rem)">
          <Flex align="center" w="100%" gap="md">
            <Textarea
              size="md"
              placeholder="Aa"
              autosize
              minRows={1}
              maxRows={5}
              w="100%"
              rightSection={
                <ActionIcon color="blue" size="md" radius="xs">
                  <IconSend size={20} />
                </ActionIcon>
              }
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default Chatroom;
