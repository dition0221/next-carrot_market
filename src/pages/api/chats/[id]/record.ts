import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

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

  try {
    // TODO: Add 판매내역 to seller
    await prismaClient.record.createMany({
      data: [
        {
          user,
        },
      ],
    });

    // TODO: Add 구매내역 to customer

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
