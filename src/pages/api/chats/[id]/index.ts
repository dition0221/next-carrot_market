import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  const { id: chatRoomId } = req.query;
  if (typeof chatRoomId !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  /* GET: Check authorization of chat room */
  if (req.method === "GET") {
    try {
      const chatRoom = await prismaClient.chatRoom.findFirst({
        where: {
          id: +chatRoomId,
          ChatRoomUsers: {
            some: {
              user: {
                id: user.id,
              },
            },
          },
        },
        select: {
          id: true,
          ChatRoomUsers: {
            where: {
              userId: {
                not: user.id,
              },
            },
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
          _count: {
            select: {
              Chats: true,
            },
          },
        },
      });
      if (!chatRoom)
        return res.status(404).json({ ok: false, error: "Not Found" });

      return res.status(200).json({ ok: true, chatRoom });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* DELETE: Delete chat room */
  if (req.method === "DELETE") {
    try {
      await prismaClient.chatRoom.delete({
        where: {
          id: +chatRoomId,
        },
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error: JSON.stringify(error) });
    }
  }
}

export default withHandler({
  methods: ["GET", "DELETE"],
  handler,
});
