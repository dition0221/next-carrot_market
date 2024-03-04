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

  // POST: Create 'post' to DB
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

      await res.revalidate("/community"); // ODR
      return res.status(200).json({ ok: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  // GET: 'post' list
  if (req.method === "GET") {
    // get coordination
    const { latitude, longitude } = req.query;
    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);

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
        where: {
          OR: [
            {
              latitude: {
                gte: latitudeNumber - 0.01,
                lte: latitudeNumber + 0.01,
              },
              longitude: {
                gte: longitudeNumber - 0.01,
                lte: longitudeNumber + 0.01,
              },
            },
            {
              latitude: null,
              longitude: null,
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
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
