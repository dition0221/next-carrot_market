import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { IWriteChatForm } from "@/pages/chats/[id]";

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

  /* GET: Chatting list*/
  if (req.method === "GET") {
    const { page } = req.query;
    if (typeof page !== "string")
      return res
        .status(400)
        .json({ ok: false, error: "Only one dynamicParam is allowed" });

    const MESSAGES_PER_PAGE = 10; // pagination

    try {
      const chats = await prismaClient.chat.findMany({
        where: {
          chatRoom: {
            id: +chatRoomId,
          },
        },
        select: {
          id: true,
          createdAt: true,
          content: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: MESSAGES_PER_PAGE,
        skip: +page * MESSAGES_PER_PAGE,
      });
      if (!chats)
        return res.status(404).json({ ok: false, error: "Not Found" });

      return res.status(200).json({ ok: true, chats: chats.reverse() });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* POST: Write chat */
  if (req.method === "POST") {
    const { chat } = req.body as IWriteChatForm;
    if (chat.length < 1 || chat.length > 100)
      return res.status(400).json({ ok: false, error: "Please write a chat" });

    try {
      await prismaClient.chat.create({
        data: {
          content: chat,
          user: {
            connect: {
              id: user.id,
            },
          },
          chatRoom: {
            connect: {
              id: +chatRoomId,
            },
          },
        },
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
