import Ably from "ably/promises";
import prisma from "@lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const client = new Ably.Realtime(process.env.ABLY_API_KEY || "");
  const { senderId, channelId, content, profileImage, name } = req.body;

  const channel = client.channels.get(`channel-${channelId}`);
  try {
    const message = {
      senderId,
      channelId,
      content,
    };
    await prisma.message.create({
      data: {
        senderId,
        channelId,
        content,
      },
    });

    channel.publish("test-message", {
      profileImage,
      name,
      timestamp: new Date().toISOString,
      ...message,
    });
    return res.status(200).json({ content });
  } catch (error) {
    console.log("Error creating message: ", error);
    return res.status(500).json({ error: "Failed to create message" });
  }
}
