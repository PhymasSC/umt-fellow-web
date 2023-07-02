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
import { GET_CHANNEL_PARTICIPANTS, GET_MESSAGES } from "@operations/queries";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useForm } from "@mantine/form";

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
  const { data: participants } = useQuery(GET_CHANNEL_PARTICIPANTS, {
    variables: {
      channelId: router.query.id?.[0],
      limit: 5,
    },
  });
  const msgForm = useForm({
    initialValues: {
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.message.trim() === "")
        msgForm.setErrors({ message: "Message cannot be empty" });
      return errors;
    },
  });

  const [channel, ably] = useChannel(
    `channel-${router.query.id?.[0] as string}`,
    async (message: Types.Message) => {
      setMessages((messages) => [...messages, message.data]);
    }
  );

  const sendMessage = async () => {
    if (msgForm.errors.message) return;
    try {
      const response = await fetch("/api/messages/create-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: session?.user.id,
          channelId: router.query.id?.[0],
          content: msgForm.values.message,
          profileImage: session?.user.image,
          name: session?.user.name,
        }),
      });

      if (response.ok) {
        msgForm.setValues({ message: "" });
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

  useEffect(() => {
    console.log(router.query.id?.[0]);
    console.log(participants);
  }, [participants]);
  return (
    <Card withBorder h="100%" w="100%">
      <Flex direction="column" gap="md" h="100%">
        <Flex gap="md">
          <Avatar.Group>
            {(participants &&
              participants.getChannelParticipants.map((participant: any) => {
                if (participant.user.id === session?.user.id) return null;
                return (
                  <Link href={`/profile/${participant.user.id}`} passHref>
                    <Avatar
                      radius="xl"
                      size="md"
                      src={participant.user.image}
                      component="a"
                    />
                  </Link>
                );
              })) || <Avatar radius="xl" size="md" src={""} />}
          </Avatar.Group>
          <Flex direction="column" justify="center" gap="0">
            <Title order={1} size="h6" fw={500}>
              {participants &&
                participants.getChannelParticipants.map((participant: any) => {
                  if (participant.user.id === session?.user.id) return null;
                  return participant.user.name;
                })}
            </Title>
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
              {messages && messages.length > 0 ? (
                messages.map((message, index) => {
                  setTimeout(() => {
                    viewport?.current?.scrollTo({
                      top: viewport.current.scrollHeight,
                      behavior: "smooth",
                    });
                  }, 100);
                  return (
                    <>
                      {
                        // if the message is first in the group, show divider
                        index === 0 && (
                          <Divider
                            label={"There are no more previous messages"}
                            labelPosition="center"
                          />
                        )
                      }
                      {
                        // if the message is 10 minutes older than the previous message, show the timestamp
                        (dayjs(message.timestamp).diff(
                          messages[index - 1]?.timestamp,
                          "minute"
                        ) >= 10 ||
                          index === 0) && (
                          <Text
                            align="center"
                            size="xs"
                            fw="bold"
                            color="dimmed"
                          >
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
                            maw={"400px"}
                            isRecipient={message.senderId === session?.user.id}
                            timestamp={message.timestamp}
                            message={message.content}
                          />
                          <Text size="xs" color="dimmed">
                            {dayjs(message.timestamp).format("h:mm A")}
                          </Text>
                        </Flex>
                      </BubbleGroup>
                    </>
                  );
                })
              ) : (
                <>
                  {participants &&
                    participants.getChannelParticipants.map(
                      (participant: any) => {
                        if (participant.user.id === session?.user.id)
                          return null;
                        return (
                          <Flex
                            direction="column"
                            align="center"
                            gap="md"
                            mt="md"
                          >
                            <Link
                              href={`/profile/${participant.user.id}`}
                              passHref
                            >
                              <Avatar
                                component="a"
                                radius="xl"
                                size="lg"
                                src={participant.user.image}
                              />
                            </Link>
                            <Text fw="bold">{participant.user.name}</Text>
                            <Text color="dimmed" size="sm">
                              You have no conversation with{" "}
                              {participant.user.name} before. Let&apos;s send a
                              message to get the conversation started!{" "}
                            </Text>
                          </Flex>
                        );
                      }
                    )}
                </>
              )}
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
                disabled={msgForm.values.message.trim() === ""}
                onClick={sendMessage}
              >
                <IconSend size={20} />
              </ActionIcon>
            }
            {...msgForm.getInputProps("message")}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Chatroom;
