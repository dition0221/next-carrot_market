import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/client";

interface IReqBody {
  token: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { token }: IReqBody = req.body;

  // Find token from DB
  const foundToken = await prismaClient.token.findUnique({
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
  await prismaClient.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  return res.status(200).json({ ok: true });
}

export default withHandler({
  method: "POST",
  handler,
});
