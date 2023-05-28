import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

const OTP_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>UMT Fellow</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
    
    body {
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #AEE2FF;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  padding: 3rem;
}

h1 {
  font-size: 3rem;
  margin-top: 0;
  font-weight: 600;
  text-align: center;
  color: blue;
}

p {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #000;
}

.otp {
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #eee;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #666;
}

.card {
  padding: 2em;
  background-color: #FFF;
  margin: 0 4em;
  min-width: 500px;
  width: 60vw;
  border-radius: .8rem;
}

.otp-wrapper {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.otp {
  font-size: 2rem;
}
.otp-wrap-wrapper {
  position: relative;
}
.otp-wrapper-selected::before {
  content: "Copied";
  background-color: #333a;
  color: white;
  padding: 1rem;
  border-radius: .4rem;
  position: absolute;
  top: -4rem;
}

.otp-wrapper-selected:after{
  content: " ";
  position: absolute;
  top: -0.5rem;
  border-top: 10px solid #333a;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
  </style>
</head>
<body>
  <h1>UMT Fellow OTP</h1>
  <div class="card">
  <p>Hi {username},</p>
  <p>We're sending you this email to verify your UMT Fellow account.</p>
  <p>Your OTP is:</p>
    <div class="otp-wrap-wrapper">
    <div class="otp-wrapper">
      <div class="otp">{otp-1}</div>
      <div class="otp">{otp-2}</div>
      <div class="otp">{otp-3}</div>
      <div class="otp">{otp-4}</div>
      <div class="otp">{otp-5}</div>
      <div class="otp">{otp-6}</div>
    </div>
    </div>
  <p>Please enter this code when you're prompted to verify your account.</p>
  <p>If you didn't request this email, please ignore it.</p>
  <p>Thanks,</p>
  <p>UMT Fellow</p>
  </div>
  <script defer>
    const otp = document.querySelector(".otp-wrapper")

otp.addEventListener("click", () => {
    navigator.clipboard.writeText(otp.textContent.replaceAll(/\n /g, "").replaceAll(" ", ""));
    otp.classList.add("otp-wrapper-selected")
    setTimeout(()=> {
      otp.classList.remove("otp-wrapper-selected");
    }, 2000);
});
  </script>    
</body>
</html>

`;

interface SubjectType {
  [key: string]: string;
}
const SUBJECT: SubjectType = {
  OTP: "Verify Your UMT Fellow Account",
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { name, email, emailType, data } = req.body;
  mail.setApiKey(process.env.SENDGRID_API_KEY || "");

  mail
    .send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || "",
      subject: SUBJECT[emailType],
      html: OTP_TEMPLATE.replace("{username}", name)
        .replace("{otp-1}", data[0])
        .replace("{otp-2}", data[1])
        .replace("{otp-3}", data[2])
        .replace("{otp-4}", data[3])
        .replace("{otp-5}", data[4])
        .replace("{otp-6}", data[5]),
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
