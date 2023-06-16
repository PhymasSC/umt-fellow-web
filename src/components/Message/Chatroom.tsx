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
  ScrollArea,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import BubbleGroup from "./BubbleGroup";
import { useChannel } from "@ably-labs/react-hooks";
import type { Types } from "ably";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Bubble from "./Bubble";

type Msg = {
  name: string;
  senderId: string;
  content: string;
  timestamp: Date;
  profileImage: string;
};

const Chatroom = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const viewport = useRef<HTMLDivElement>(null);

  const [channel, ably] = useChannel(
    `channel-${router.query.id?.[0] as string}`,
    async (message: Types.Message) => {
      setMessages((messages) => [...messages, message.data]);
    }
  );

  const sendMessage = async () => {
    const msg = document.getElementById("message") as HTMLInputElement;

    try {
      const response = await fetch("/api/messages/create-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: session?.user.id,
          channelId: router.query.id?.[0],
          content: msg.value,
          profileImage: session?.user.image,
          name: session?.user.name,
        }),
      });

      if (response.ok) {
        msg.value = "";
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
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

        <Card id="chat-window" withBorder h="100%">
          <ScrollArea
            h="100%"
            offsetScrollbars
            type="scroll"
            viewportRef={viewport}
          >
            <Flex direction="column" gap="md">
              {messages.map((message, index) => {
                setTimeout(() => {
                  viewport?.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "smooth",
                  });
                }, 100);
                return (
                  <BubbleGroup
                    key={index}
                    name={message.name}
                    profileUrl={`/profile/${message.senderId}`}
                    profileImage={message.profileImage}
                    isRecipient={message.senderId === session?.user.id}
                  >
                    <Bubble
                      message={message.content}
                      sx={(theme) => ({
                        wordBreak: "break-word",
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.blue[1]
                            : theme.colors.blue[6],
                        color:
                          theme.colorScheme === "dark"
                            ? theme.colors.gray[9]
                            : theme.colors.gray[1],
                      })}
                    />
                  </BubbleGroup>
                );
              })}
            </Flex>
          </ScrollArea>
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
              // if (e.key === "Enter" && !e.shiftKey) {
              if (e.key === "Enter" && !e.shiftKey) {
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
