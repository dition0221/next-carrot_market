import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // streamId
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  // Find stream
  try {
    const stream = await prismaClient.stream.findUnique({
      where: {
        id: +id,
      },
      include: {
        Messages: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    if (!stream)
      return res.status(404).json({ ok: false, error: "404 Not Found" });

    return res.status(200).json({ ok: true, stream });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}

export default withHandler({
  methods: ["GET"],
  handler,
});
