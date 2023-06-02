import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

interface SubjectType {
  [key: string]: string;
}
const SUBJECT: SubjectType = {
  OTP: "Verify Your UMT Fellow Account",
};

const TEMPLATE_ID = {
  FORGOT_PASSWORD: "d-3811326b68cc4d549a5d4119960b696c",
  OTP: "d-e1d5b603a9e241e3bd6f79c20b7ca6da",
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   if (req.method !== "POST") {
  //     res.status(405).json({ message: "Method not allowed" });
  //     return;
  //   }

  //   const { name, email, emailType, data } = req.body;
  mail.setApiKey(process.env.SENDGRID_API_KEY || "");

  mail
    .send({
      replyTo: "umtfellow@gmail.com",
      templateId: "d-e1d5b603a9e241e3bd6f79c20b7ca6da",
      dynamicTemplateData: {
        username: "sc",
        "otp-1": 1,
        "otp-2": 2,
        "otp-3": 3,
        "otp-4": 4,
        "otp-5": 5,
        "otp-6": 6,
      },
      to: "garylau@live.com",
      from: process.env.SENDGRID_FROM_EMAIL || "",
      subject: "Verify Your UMT Fellow Account",
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
