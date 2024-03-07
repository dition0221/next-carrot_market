import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";

interface IReqBody {
  token: string;
  ok: boolean;
  email?: string;
  phone?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { token, ok, email, phone }: IReqBody = req.body;
  if (!ok)
    return res.status(400).json({ ok: false, error: "User data is empty" });
  const method = phone ? { phone } : email ? { email } : null;
  if (!method) return res.status(400).json({ ok: false });

  try {
    // 1) Find token from DB
    const foundToken = await prismaClient.token.findFirst({
      where: {
        payload: token,
        user: {
          ...method,
        },
      },
      select: {
        userId: true,
        createdAt: true,
      },
    });
    if (!foundToken)
      return res.status(401).json({ ok: false, error: "Token is wrong" });

    // Token validity time: 3 mins
    if (new Date(foundToken.createdAt).getTime() < Date.now() - 3 * 60 * 1000) {
      await prismaClient.token.deleteMany({
        where: {
          payload: token,
          user: {
            ...method,
          },
        },
      });
      return res
        .status(401)
        .json({ ok: false, error: "Token is expired, Please login again" });
    }

    // 2) After user log-in, add user data to session
    const session = await getSession(req, res);
    session.user = {
      id: foundToken.userId,
    };
    await session.save();

    // 3) Delete all tokens
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
  isPrivate: false,
});
