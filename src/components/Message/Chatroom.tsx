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
import { useChannel } from "@ably-labs/react-hooks";
import type { Types } from "ably";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Bubble from "./Bubble";

type ChatroomProps = {
  id: string;
};

type Msg = {
  sender: string;
  text: string;
  timestamp: Date;
};
const Chatroom = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [channel, ably] = useChannel(
    "channel-1",
    async (message: Types.Message) => {
      console.log("Received: ", message);
      setMessages((messages) => [...messages, message.data]);
    }
  );

  const sendMessage = () => {
    const window = document.getElementById("chat-window") as HTMLDivElement;
    const msg = document.getElementById("message") as HTMLInputElement;
    const message: any = {
      sender: session?.user.id,
      text: msg.value,
      timestamp: new Date(),
    };
    msg.value = "";
    window.scrollTop = window.scrollHeight - window.clientHeight;
    channel.publish("chat-message", message);
  };

  return (
    <Card withBorder h="100%" w="100%">
      <Flex direction="column" gap="md" h="100%">
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

        <Card
          id="chat-window"
          withBorder
          h="100%"
          sx={{
            overflow: "auto",
          }}
        >
          <Flex direction="column" gap="md">
            {messages.map((message, index) => {
              return (
                <BubbleGroup
                  key={index}
                  profileUrl={""}
                  profileImage={""}
                  message={""}
                  isRecipient={message.sender === session?.user.id}
                >
                  <Bubble
                    message={message.text}
                    isRecipient={message.sender === session?.user.id}
                  />
                </BubbleGroup>
              );
            })}
          </Flex>
        </Card>

        <Flex align="center" w="100%" gap="md" mah="200px">
          <Textarea
            id="message"
            size="sm"
            placeholder="Aa"
            autosize
            minRows={1}
            maxRows={5}
            w="100%"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            rightSection={
              <ActionIcon
                color="blue"
                size="md"
                radius="xs"
                onClick={sendMessage}
              >
                <IconSend size={20} />
              </ActionIcon>
            }
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Chatroom;
