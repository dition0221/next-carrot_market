import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { IMessageForm } from "@/pages/streams/[id]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // streamId
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  // Message from <form>: body.message
  const body = req.body as IMessageForm;

  // POST: Send a message
  try {
    const message = await prismaClient.message.create({
      data: {
        message: body.message,
        user: {
          connect: {
            id: user.id,
          },
        },
        stream: {
          connect: {
            id: +id,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
});
