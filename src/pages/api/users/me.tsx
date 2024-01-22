import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { getSession } from "@/libs/server/getSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const session = await getSession(req, res);
  if (!session) return res.status(401).end();

  // Find user with session from DB
  const profile = await client.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });
  if (!profile) return res.status(404).end();

  return res.status(200).json({ ok: true, profile });
}

export default withHandler("GET", handler);
