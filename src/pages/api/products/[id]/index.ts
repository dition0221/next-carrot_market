import type { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

interface IEditProduct {
  name: string;
  price: string;
  description: string;
  photoId?: string;
}

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

  // user: session
  const { user } = await getSession(req, res);

  /* GET */
  if (req.method === "GET") {
    try {
      // GET 'Product'
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
      if (!product)
        return res.status(404).json({ ok: false, error: "404 Not Found" });

      // GET 'similar 'Product'
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

      // GET 'Favorite'
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

      return res
        .status(200)
        .json({ ok: true, product, isLiked, relatedProducts });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        error: (error as Error).message || JSON.stringify(error),
      });
    }
  }

  /* POST: Edit 'product' */
  if (req.method === "POST") {
    const { name, price, description, photoId }: IEditProduct = req.body;

    try {
      const product = await prismaClient.product.update({
        where: {
          id: +id,
          userId: user?.id,
        },
        data: {
          name,
          price: +price,
          description,
          imageUrl: photoId,
        },
      });
      return res.status(200).json({ ok: true, product });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        error: (error as Error).message || JSON.stringify(error),
      });
    }
  }

  /* DELETE */
  if (req.method === "DELETE") {
    try {
      await prismaClient.product.delete({
        where: {
          id: +id,
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
  methods: ["GET", "POST", "DELETE"],
  handler,
});
