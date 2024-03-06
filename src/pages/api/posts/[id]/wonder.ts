import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";

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

  // Check 'post' exists
  const post = await prismaClient.post.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
    },
  });
  if (!post) return res.status(404).json({ ok: false, error: "404 Not Found" });

  // If 'wondering post' already exists => Delete / Not exists => Create
  try {
    const alreadyExists = await prismaClient.wondering.findFirst({
      where: {
        userId: user.id,
        postId: +id,
      },
      select: {
        id: true,
      },
    });
    if (alreadyExists) {
      await prismaClient.wondering.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await prismaClient.wondering.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: +id,
            },
          },
        },
      });
    }

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
