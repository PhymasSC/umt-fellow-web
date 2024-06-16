import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const saltRounds = 10;
  const {
    token,
    password,
    isForgot = true,
    userId,
    currentPassword,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (isForgot) {
    const response = await prisma.resetToken.findFirst({
      where: {
        token: token,
      },
    });
    if (!response) {
      res.status(200).json({
        err: "Token does not exist! Please file a new password request.",
      });
      return;
    }
    const isExpired = (response?.expiresAt || new Date()) < new Date();
    if (isExpired) {
      res.status(200).json({
        err: "The token had expired! Please file a new password request.",
      });
      return;
    }
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
    return res.status(200).json({ message: "success" });
  }

  const userPassword = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });

  const isMatch = await bcrypt.compare(
    currentPassword,
    userPassword?.password || ""
  );

  console.log(isMatch);
  if (!isMatch) {
    res.status(200).json({ err: "Password does not match" });
    return;
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return res.status(200).json({ message: "success" });
}
