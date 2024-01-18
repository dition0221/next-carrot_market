import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

interface IReqBody {
  phone?: string;
  email?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { phone, email }: IReqBody = req.body;
  const method = phone ? { phone: +phone } : email ? { email } : null;
  if (!method) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  // Create token & if user doesn't exist, Create user
  const token = await client.token.create({
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
  console.log(token);

  return res.status(200).json({ ok: true });
}

export default withHandler("POST", handler);
