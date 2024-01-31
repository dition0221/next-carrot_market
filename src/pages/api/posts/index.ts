import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";

interface IReqBody {
  question: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { question }: IReqBody = req.body;
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Create 'post' to DB
  try {
    const post = await prismaClient.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: true, error });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
});
