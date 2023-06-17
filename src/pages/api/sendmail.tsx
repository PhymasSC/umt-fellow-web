import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

interface SubjectType {
  [key: string]: string;
}
const SUBJECT: SubjectType = {
  OTP: "Verify Your UMT Fellow Account",
  FORGOT_PASSWORD: "Reset Your UMT Fellow Account Password",
};

const TEMPLATE_ID = {
  FORGOT_PASSWORD: "d-3811326b68cc4d549a5d4119960b696c",
  OTP: "d-e1d5b603a9e241e3bd6f79c20b7ca6da",
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const {
    name,
    email,
    emailType,
    data,
  }: {
    name: string;
    email: string;
    emailType: "OTP" | "FORGOT_PASSWORD";
    data: any;
  } = req.body;
  mail.setApiKey(process.env.SENDGRID_API_KEY || "");

  mail
    .send({
      replyTo: "umtfellow@gmail.com",
      templateId: TEMPLATE_ID[emailType],
      dynamicTemplateData: {
        username: name,
        ...data,
      },
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || "",
      subject: SUBJECT[emailType],
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });

  res.status(200).json({ status: "OK" });
}

export default handler;
