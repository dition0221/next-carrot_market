import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import { getSession } from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";

interface IPostReqBody {
  question: string;
  latitude: number | null;
  longitude: number | null;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  /* POST: Create 'post' to DB */
  if (req.method === "POST") {
    const { question, latitude, longitude }: IPostReqBody = req.body;

    try {
      const post = await prismaClient.post.create({
        data: {
          question,
          latitude,
          longitude,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return res.status(200).json({ ok: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  /* GET: 'post' list */
  if (req.method === "GET") {
    const { page } = req.query;
    if (typeof page !== "string")
      return res
        .status(400)
        .json({ ok: false, error: "Only one 'page' parameter is allowed" });
    const offset = +page;

    /* 
    // get coordination
    const { latitude, longitude } = req.query;
    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);
    */

    try {
      const posts = await prismaClient.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              Wonderings: true,
              Answers: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
        skip: offset * 10,
      });
      if (posts.length === 0)
        return res.status(404).json({ ok: false, error: "Not Found" });

      return res.status(200).json({ ok: true, posts });
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
