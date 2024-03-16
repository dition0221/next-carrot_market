import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { type IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const RECORDS_PER_PAGE = 10;

  // Check online user
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Check 'kind' params
  const { kind } = req.query;
  if (kind !== "Purchase" && kind !== "Sale")
    return res.status(400).json({ ok: false, error: "Query parameter error" });

  // Pagination
  const { page } = req.query;
  if (typeof page !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one 'page' parameter is allowed" });
  const offset = +page;

  // GET: product list of kind("Purchase" | "Sale")
  try {
    const products = await prismaClient.record.findMany({
      where: {
        userId: user.id,
        kind,
      },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
      take: RECORDS_PER_PAGE,
      skip: offset * RECORDS_PER_PAGE,
    });
    if (products.length === 0)
      return res.status(404).json({ ok: false, error: "Not Found" });

    return res.status(200).json({ ok: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}

export default withHandler({
  methods: ["GET"],
  handler,
});
