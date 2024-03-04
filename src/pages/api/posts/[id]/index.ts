import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // postId
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  // 'user' data from session
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Get 'post' from DB
  // const post = await prismaClient.post.findUnique({
  //   where: {
  //     id: +id,
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         id: true,
  //         name: true,
  //         avatar: true,
  //       },
  //     },
  //     Answers: {
  //       select: {
  //         id: true,
  //         answer: true,
  //         createdAt: true,
  //         user: {
  //           select: {
  //             id: true,
  //             name: true,
  //             avatar: true,
  //           },
  //         },
  //       },
  //     },
  //     _count: {
  //       select: {
  //         Answers: true,
  //         Wonderings: true,
  //       },
  //     },
  //   },
  // });
  // if (!post) return res.status(404).json({ ok: false, error: "404 Not Found" });

  const isWondering = Boolean(
    await prismaClient.wondering.findFirst({
      where: {
        postId: +id,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
  );

  return res.status(200).json({ ok: true, isWondering });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
