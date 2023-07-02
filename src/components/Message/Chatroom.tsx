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
  Tooltip,
  Divider,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import BubbleGroup from "./BubbleGroup";
import { useChannel } from "@ably-labs/react-hooks";
import type { Types } from "ably";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Bubble from "./Bubble";
import { GET_MESSAGES } from "@operations/queries";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

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
  const { data } = useQuery(GET_MESSAGES, {
    variables: {
      channelId: router.query.id?.[0],
    },
  });

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

  useEffect(() => {
    if (data) {
      setMessages([
        ...data.getMessages
          .map((info: any) => {
            return {
              name: info.user.name,
              senderId: info.user.id,
              content: info.content,
              timestamp: info.created_at,
              profileImage: info.user.image,
            };
          })
          .reverse(),
      ]);
    }
  }, [data]);

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
            <Title order={1} size="h6" fw={500}>
              {router.query.id?.[0]}
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
                  <>
                    {
                      // if the message is one hour older than the previous message, show the timestamp
                      (dayjs(message.timestamp).diff(
                        messages[index - 1]?.timestamp,
                        "hour"
                      ) >= 1 ||
                        index === 0) && (
                        <Text align="center" size="xs" fw="bold" color="dimmed">
                          {dayjs(message.timestamp).format(
                            // check if the message was sent today
                            dayjs(message.timestamp).isSame(dayjs(), "day")
                              ? "hh:mm A"
                              : // check if the message was sent in the last 7 days
                              dayjs(message.timestamp).isAfter(
                                  dayjs().subtract(7, "day")
                                )
                              ? "ddd hh:mm A"
                              : "DD/MM/YYYY hh:mm A"
                          )}
                        </Text>
                      )
                    }
                    <BubbleGroup
                      key={index}
                      name={message.name}
                      profileUrl={`/profile/${message.senderId}`}
                      profileImage={message.profileImage}
                      isRecipient={message.senderId === session?.user.id}
                    >
                      <Flex
                        align="flex-end"
                        gap="xs"
                        direction={
                          message.senderId === session?.user.id
                            ? "row-reverse"
                            : "row"
                        }
                      >
                        <Bubble
                          timestamp={message.timestamp}
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
                        <Tooltip
                          label={
                            <Text fz="xs">
                              {dayjs(message.timestamp).calendar()}
                            </Text>
                          }
                          bg="#000000bb"
                          offset={10}
                        >
                          <Text size="xs" color="dimmed">
                            {dayjs(message.timestamp).format("h:mm A")}
                          </Text>
                        </Tooltip>
                      </Flex>
                    </BubbleGroup>
                  </>
                );
              })}
            </Flex>
          </ScrollArea>
        </Card>

        <Flex align="center" w="100%" gap="md" mah="200px">
          <Textarea
            id="message"
            size="sm"
            placeholder="Message"
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
