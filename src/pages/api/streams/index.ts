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

  // POST: Create live stream
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

  // GET: Get stream list
  if (req.method === "GET") {
    try {
      const streams = await prismaClient.stream.findMany({
        take: 10,
      });
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
