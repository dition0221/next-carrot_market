import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
// INTERFACE
import type { ITokenForm } from "@/pages/enter";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { token }: ITokenForm = req.body;

  // Find token from DB
  const foundToken = await prismaClient.token.findUnique({
    where: {
      payload: String(token),
    },
  });
  if (!foundToken) return res.status(401).end();

  // If user log-in, add user data to session
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
});
