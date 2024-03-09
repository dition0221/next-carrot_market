import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { ICreateLiveForm } from "@/pages/streams/create";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  /* POST: Create live stream */
  if (req.method === "POST") {
    try {
      const { name, price, description }: ICreateLiveForm = req.body;
      const stream = await prismaClient.stream.create({
        data: {
          name,
          price,
          description,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return res.status(200).json({ ok: true, stream });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* GET: Get stream list */
  if (req.method === "GET") {
    const { page } = req.query;
    if (typeof page !== "string")
      return res
        .status(400)
        .json({ ok: false, error: "Only one 'page' parameter is allowed" });
    const offset = +page;

    try {
      const streams = await prismaClient.stream.findMany({
        take: 5,
        skip: offset * 5,
        orderBy: {
          createdAt: "desc",
        },
      });
      if (streams.length === 0)
        return res.status(404).json({ ok: false, error: "Not Found" });

      return res.status(200).json({ ok: true, streams });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: true, error });
    }
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
