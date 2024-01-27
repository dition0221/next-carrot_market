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
      .json({ ok: false, error: "Only one dynamicParam is allowed." });

  // user
  const { user } = await getSession(req, res);

  // Get 'Product' from DB
  const product = await prismaClient.product.findUnique({
    where: { id: +id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  if (!product) return res.status(404).json({ ok: false });

  // Get similar 'Product' from DB
  const terms = product.name
    .split(" ")
    .filter((word) => word !== "") // Except blank
    .map((word) => ({
      name: {
        contains: word,
      },
    }));
  const relatedProducts = await prismaClient.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: +id,
        },
      },
    },
  });

  // Favorite or not
  const isLiked = Boolean(
    await prismaClient.favorite.findFirst({
      where: {
        productId: +id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  return res.status(200).json({ ok: true, product, isLiked, relatedProducts });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
