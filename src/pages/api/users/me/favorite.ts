import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { type IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // Check online user
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Pagination
  const { page } = req.query;
  if (typeof page !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one 'page' parameter is allowed" });
  const offset = +page;

  // GET: 'kind's of product list
  try {
    const products = await prismaClient.favorite.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            _count: {
              select: {
                Favorites: true,
              },
            },
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
    return res.status(500).json({ ok: false, error: JSON.stringify(error) });
  }
}

export default withHandler({
  methods: ["GET"],
  handler,
});
