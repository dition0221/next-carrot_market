import type { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
// INTERFACE
import type { IProductUploadForm } from "@/pages/products/upload";
import type { Product, User } from "@prisma/client";

interface ProductWithUser extends Product {
  user?: {
    id: number;
    phone?: string | null;
    email?: string | null;
    name: string;
    avatar: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export interface IProductResponse {
  ok: boolean;
  error?: any;
  product?: ProductWithUser; // POST
  products?: Product[]; // GET
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductResponse>
) {
  // GET: Find 'Product' list from DB
  if (req.method === "GET") {
    try {
      const products = await prismaClient.product.findMany({});
      return res.status(200).json({ ok: true, products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  // POST: Upload 'Product' to DB
  if (req.method === "POST") {
    const { name, price, description }: IProductUploadForm = req.body;
    const { user } = await getSession(req, res);

    try {
      const product = await prismaClient.product.create({
        data: {
          name,
          price: +price,
          description,
          imageUrl: "TEST",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
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
