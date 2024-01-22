import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { getSession } from "@/libs/server/getSession";

interface IReqBody {
  token: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { token }: IReqBody = req.body;

  // Find token from DB
  const foundToken = await client.token.findUnique({
    where: {
      payload: String(token),
    },
  });
  if (!foundToken) return res.status(401).end();

  // If user log-in, add user data to session
  const session = await getSession(req, res);
  session.user = {
    id: foundToken.userId,
  };
  await session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  return res.status(200).json({ ok: true });
}

export default withHandler("POST", handler);