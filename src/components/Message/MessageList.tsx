import { SimpleGrid, Box } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SingleMessage from "./SingleMessage";
import { GET_CHANNELS } from "@operations/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

type ChannelData = {
  id: string;
  messages: {
    content: string;
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
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_CHANNELS, {
    variables: {
      userId: session?.user.id || "",
    },
  });

  // const { getChannels }: { getChannels: ChannelData } = data;
  useEffect(() => {
    // console.log(data);
    // console.log(getChannels);
    console.log(
      data?.getChannels?.map((item: ChannelData) =>
        item.participants.filter((item) => item.user.id !== session?.user.id)
      )
    );
    console.log(data);

    // data.getChannels.participants;
  }, [data]);

  return (
    <SimpleGrid>
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
                avatar={user.image}
                isSelected={true}
              />
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default MessageList;
