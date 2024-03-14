import type { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // productId
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  // 'user' data from session
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Check 'product' exists
  const product = await prismaClient.product.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
    },
  });
  if (!product)
    return res.status(404).json({ ok: false, error: "404 Not Found" });

  // If 'favorite product' already exists => Delete / Not exists => Create
  try {
    const alreadyFavExists = await prismaClient.favorite.findFirst({
      where: {
        productId: +id,
        userId: user.id,
      },
    });
    if (alreadyFavExists) {
      // Delete
      await prismaClient.favorite.delete({
        where: {
          id: alreadyFavExists.id,
        },
      });
    } else {
      // Create
      await prismaClient.favorite.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          product: {
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
