import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY || "");

  const channel = client.channels.get("some-channel-name");

  const message: any = {
    text: `Server sent a message on behalf of ${req.body.sender}`,
  };
  channel.publish("test-message", message);

  res.status(200);
}
