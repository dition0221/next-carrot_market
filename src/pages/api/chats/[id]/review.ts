import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

interface IReqBody {
  review: string;
  score: number;
  sellerId: number;
  buyerId: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  const { id: chatRoomId } = req.query;
  if (typeof chatRoomId !== "string")
    return res
      .status(400)
      .json({ ok: false, error: "Only one dynamicParam is allowed" });

  /* POST: Create a review */
  try {
    const { review, score, sellerId, buyerId } = req.body as IReqBody;

    await prismaClient.review.create({
      data: {
        review,
        createdBy: {
          connect: {
            id: buyerId,
          },
        },
        createdFor: {
          connect: {
            id: sellerId,
          },
        },
        score,
      },
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
