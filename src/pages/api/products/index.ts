import type { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
// INTERFACE
import type { Product } from "@prisma/client";

export interface ProductWithCount extends Product {
  _count: {
    Favorites: number; // kind
  };
}

export interface IProductList {
  ok: boolean;
  error?: any;
  // POST
  product?: Product;
  // GET
  products?: ProductWithCount[];
  relatedProducts?: Product[];
}

interface IUploadProduct {
  name: string;
  price: string;
  description: string;
  photoId?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductList>
) {
  /* GET: Find 'Product' list from DB */
  if (req.method === "GET") {
    const { page } = req.query;
    if (typeof page !== "string")
      return res
        .status(400)
        .json({ ok: false, error: "Only one 'page' parameter is allowed" });
    const offset = +page;

    try {
      const products = await prismaClient.product.findMany({
        include: {
          _count: {
            select: {
              Favorites: true,
            },
          },
        },
        take: 10,
        skip: offset * 10,
      });
      if (products.length === 0)
        return res.status(404).json({ ok: false, error: "Not Found" });

      return res.status(200).json({ ok: true, products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* POST: Upload 'Product' to DB */
  if (req.method === "POST") {
    const { name, price, description, photoId }: IUploadProduct = req.body;
    const { user } = await getSession(req, res);
    if (!user)
      return res.status(401).json({ ok: false, error: "Please log-in" });

    try {
      const product = await prismaClient.product.create({
        data: {
          name,
          price: +price,
          description,
          imageUrl: photoId ?? "",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      if (!product)
        return res
          .status(500)
          .json({ ok: false, error: "Create product error" });
      return res.status(200).json({ ok: true, product });
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
