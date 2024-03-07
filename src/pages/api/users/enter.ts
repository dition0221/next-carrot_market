import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
// SMS
import twilio from "twilio";
// E-MAIL
import { SendMailOptions } from "nodemailer";
import smtpTransporter from "@/libs/server/email";
// INTERFACE
import type { IEnterForm } from "@/pages/enter";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { phone, email }: IEnterForm = req.body;
  const method = phone ? { phone } : email ? { email } : null;
  if (!method) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  try {
    // 1) Delete all tokens of user
    await prismaClient.token.deleteMany({
      where: {
        user: {
          ...method,
        },
      },
    });

    // 2) Create new token & if user doesn't exist, Create user
    const token = await prismaClient.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...method,
            },
            create: {
              name: "Anonymous",
              ...method,
            },
          },
        },
      },
    });

    // [TEST] If phone, SMS for token
    /*
    if (phone) {
      const message = await twilioClient.messages.create({
        messagingServiceSid: process.env.TWILIO_MS_SID,
        to: process.env.PHONE_NUMBER!,
        body: `Your login token is ${payload}.`,
      });
      console.log(message);
    }
    */

    // If email, Send e-mail for token
    /*
    if (email) {
      const mailOptions: SendMailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: email,
        subject: "[TEST] 테스트 메일 발송입니다.",
        text: `안녕하세요, ${email}님. 인증 코드는 ${payload} 입니다.`,
      };
      const sendedMail = await smtpTransporter.sendMail(mailOptions);
      console.log(sendedMail);
    }
    */

    return res.status(200).json({ ok: true, ...method });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}

// export default withHandler("POST", handler);
export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
