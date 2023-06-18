import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const account = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },

    select: {
      id: true,
      account: {
        select: {
          id: true,
        },
      },
    },
  });

  const hasAccount = !!account;
  const isSocialAccount = !!account?.account[0]?.id;

  if (!hasAccount || isSocialAccount) {
    res.status(200).json({ err: isSocialAccount ? "social" : "no-account" });
    return;
  }
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 86400000);

  await prisma.resetToken.create({
    data: {
      token,
      expiresAt: expires,
      userId: account?.id,
    },
  });
  res.status(200).json({ email, token, expires });
}
