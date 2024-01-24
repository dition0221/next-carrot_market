import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/client";
import { getSession } from "@/libs/server/getSession";

interface Profile {
  id: number;
  phone: string | null;
  email: string | null;
  name: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponseType {
  ok: boolean;
  profile?: Profile;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserResponseType>
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
  method: "GET",
  handler,
});
