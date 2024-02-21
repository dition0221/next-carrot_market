import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { ProductWithUser } from "@/pages/products/[id]";

interface IReqBody {
  product: ProductWithUser;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  /* GET: Chat room of list */
  if (req.method === "GET") {
    try {
      const chatRoomList = await prismaClient.chatRoom.findMany({
        where: {
          ChatRoomUsers: {
            some: {
              userId: user.id,
            },
          },
        },
        select: {
          id: true,
          ChatRoomUsers: {
            where: {
              NOT: {
                userId: user.id,
              },
            },
            select: {
              user: {
                select: {
                  avatar: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return res.status(200).json({ ok: true, chatRoomList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* POST: Create a new chat room */
  if (req.method === "POST") {
    try {
      const { product }: IReqBody = req.body;

      // Check a chat room
      const alreadyExits = await prismaClient.chatRoom.findFirst({
        where: {
          product: {
            id: product.id,
          },
          ChatRoomUsers: {
            every: {
              userId: {
                in: [product.userId, user.id],
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (alreadyExits)
        return res.status(200).json({ ok: true, chatRoomId: alreadyExits.id });

      // If not already, Create chat system
      const chatRoom = await prismaClient.chatRoom.create({
        data: {
          name: product.name,
          product: {
            connect: {
              id: product.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      // Seller
      await prismaClient.chatRoomUser.create({
        data: {
          user: {
            connect: {
              id: product.userId,
            },
          },
          chatRoom: {
            connect: {
              id: chatRoom.id,
            },
          },
        },
      });
      // Buyer
      await prismaClient.chatRoomUser.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          chatRoom: {
            connect: {
              id: chatRoom.id,
            },
          },
        },
      });

      return res.status(200).json({ ok: true, chatRoomId: chatRoom.id });
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
