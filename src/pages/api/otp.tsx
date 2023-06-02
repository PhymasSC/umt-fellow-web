import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  const otp = Math.random().toString(36).substring(7);
  const hash = createHash("sha256").update(otp).digest("hex");
  res.json({ hash, otp });
};

export default handler;
