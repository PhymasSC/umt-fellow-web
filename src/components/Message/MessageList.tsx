import { SimpleGrid, Box, Stack } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SingleMessage from "./SingleMessage";
import { GET_CHANNELS } from "@operations/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

type ChannelData = {
  id: string;
  messages: {
    content: string;
    user: {
      id: string;
      name: string;
    };
  }[];
  participants: {
    user: {
      id: string;
      name: string;
      image: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  }[];
};

const MessageList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_CHANNELS, {
    variables: {
      userId: session?.user.id || "",
    },
  });

  return (
    <SimpleGrid cols={1} verticalSpacing={0}>
      {data?.getChannels?.map((item: ChannelData) => {
        const user = item.participants.filter(
          (item) => item.user.id !== session?.user.id
        )[0].user;
        return (
          <Link key={user.id} href={`/message/${item.id}`} passHref>
            <Box
              component="a"
              sx={{
                "&": {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
            >
              <SingleMessage
                name={user.name}
                message={item.messages[0].content}
                lastSender={item.messages[0].user}
                avatar={user.image}
                isSelected={router.query.id?.[0] === item.id}
              />
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default MessageList;
