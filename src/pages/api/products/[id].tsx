import type { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
// INTERFACE
import type { IProductResponse } from "@/pages/api/products";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductResponse>
) {
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed." });

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

  return res.status(200).json({ ok: true, product });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
