import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 86400000);
  res.status(200).json({ token, email, expires });
}
