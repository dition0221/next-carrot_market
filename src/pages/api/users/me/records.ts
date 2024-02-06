import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // Check online user
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  // Check 'kind' params
  const { kind } = req.query;
  if (kind !== "Favorite" && kind !== "Purchase" && kind !== "Sale")
    return res.status(400).json({ ok: false, error: "Query parameter error" });

  // Get 'kind's of product list
  try {
    const products = await prismaClient.record.findMany({
      where: {
        userId: user.id,
        kind,
      },
      include: {
        product: {
          include: {
            _count: {
              select: {
                Records: {
                  where: {
                    kind,
                  },
                },
              },
            },
          },
        },
      },
    });
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
