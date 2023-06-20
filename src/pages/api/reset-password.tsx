import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { hash } from "bcrypt";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const saltRounds = 10;
  const { token, password } = req.body;

  const response = await prisma.resetToken.findFirst({
    where: {
      token: token,
    },
  });

  const isExpired = (response?.expiresAt || new Date()) < new Date();

  if (isExpired) {
    res.status(200).json({ err: "expired" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await prisma.user.update({
    where: {
      id: response?.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.resetToken.delete({
    where: {
      id: response?.id,
    },
  });

  res.status(200).json({ message: "success" });
}
