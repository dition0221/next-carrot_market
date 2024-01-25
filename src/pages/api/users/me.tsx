import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { User } from "@prisma/client";

export interface IUserResponse {
  ok: boolean;
  profile?: User;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) {
  // Find user with session from DB
  const session = await getSession(req, res);
  const profile = await prismaClient.user.findUnique({
    where: { id: session.user?.id },
  });
  if (!profile) return res.status(404).end();

  return res.status(200).json({ ok: true, profile });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
