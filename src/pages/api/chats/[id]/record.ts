import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";

interface IReqBody {
  sellerId: number;
  buyerId: number;
  productId: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // Check 'chatRoom'
  const { id: chatRoomId } = req.query;
  if (typeof chatRoomId !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  try {
    const { sellerId, buyerId, productId } = req.body as IReqBody;

    const product = await prismaClient.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        name: true,
        price: true,
      },
    });
    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });

    await prismaClient.record.createMany({
      data: [
        {
          userId: +sellerId,
          kind: "Sale",
          name: product.name,
          price: product.price,
        },
        {
          userId: +buyerId,
          kind: "Purchase",
          name: product.name,
          price: product.price,
        },
      ],
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
});
