import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const { senderId, recipientId } = req.body;

  // Check if channel for two people already exists (not a group chat)
  const existingChannel = await prisma.channel.findFirst({
    where: {
      isGroup: false,
      ChannelParticipants: {
        every: {
          userId: {
            in: [senderId, recipientId],
          },
        },
      },
    },
  });

  if (existingChannel) {
    console.log("Test");
    return res.status(200).json({ channelId: existingChannel.id });
  }
  try {
    let channel = await prisma.channel.create({
      data: {
        isGroup: false,
        ChannelParticipants: {
          createMany: {
            data: [{ userId: senderId }, { userId: recipientId }],
          },
        },
      },
    });

    return res.status(200).json({ channelId: channel.id });
  } catch (err) {
    return res.status(500).json({ error: "You cannot chat with yourself!" });
  }
}
