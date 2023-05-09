import { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import type { Types } from "ably";

import Head from "next/head";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<any[]>([]);

  const [channel, ably] = useChannel(
    "channel-1",
    async (message: Types.Message) => {
      setMessages((messages) => [...messages, message.data]);
    }
  );

  const messageList = messages.map((message, index) => {
    return (
      <li key={index}>
        {message.sender} sent: {message.text} on {message.timestamp}
      </li>
    );
  });

  return (
    <div>
      <main>
        <button
          onClick={() => {
            const message: any = {
              sender: session?.user.id,
              text: `${ably.auth.clientId} sent a message`,
              timestamp: new Date(),
            };
            channel.publish("test-message", message);
          }}
        >
          Send A Message
        </button>
        <ul>{messageList}</ul>
      </main>
    </div>
  );
}
