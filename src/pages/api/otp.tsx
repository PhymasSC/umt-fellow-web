import speakeasy from "speakeasy";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a new secret for the TOTP
  const secret = speakeasy.generateSecret({ length: 20 });

  // Generate the TOTP token based on the secret

  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });

  res.status(200).json({ token });
}
