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

  // Find user with session from DB
  const profile = await prismaClient.user.findUnique({
    where: { id: user?.id },
  });
  if (!profile)
    return res.status(404).json({ ok: false, error: "404 Not Found" });

  return res.status(200).json({ ok: true, profile });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
