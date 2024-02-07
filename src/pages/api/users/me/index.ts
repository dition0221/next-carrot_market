import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";
// INTERFACE
import type { IEditProfileForm } from "@/pages/profile/edit";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  /* GET: Get user's profile */
  if (req.method === "GET") {
    // Find user with session from DB
    const profile = await prismaClient.user.findUnique({
      where: { id: user?.id },
    });
    if (!profile)
      return res.status(404).json({ ok: false, error: "404 Not Found" });

    return res.status(200).json({ ok: true, profile });
  }

  /* POST: Edit user's profile */
  if (req.method === "POST") {
    try {
      const { name, email, phone }: IEditProfileForm = req.body;
      const currentUser = await prismaClient.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          name: true,
          email: true,
          phone: true,
        },
      });
      const newName = name && name !== currentUser?.name ? name : undefined;
      const newEmail =
        email && email !== currentUser?.email ? email : undefined;
      const newPhone =
        phone && phone !== currentUser?.phone ? phone : undefined;

      // Update 'name'
      if (newName)
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: newName,
          },
        });

      // No happening
      if (!newEmail && !newPhone) return res.status(200).json({ ok: true });

      // Check duplication: email
      if (newEmail && !newPhone) {
        const alreadyExists = Boolean(
          await prismaClient.user.findUnique({
            where: {
              email: newEmail,
            },
            select: {
              id: true,
            },
          })
        );
        if (alreadyExists)
          return res
            .status(409)
            .json({ ok: false, error: "Email already taken" });
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            email: newEmail,
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Check duplication: phone
      if (newPhone && !newEmail) {
        const alreadyExists = Boolean(
          await prismaClient.user.findUnique({
            where: {
              phone: newPhone,
            },
            select: {
              id: true,
            },
          })
        );
        if (alreadyExists)
          return res
            .status(409)
            .json({ ok: false, error: "Phone already taken" });
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            phone: newPhone,
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Check duplication: email & phone
      if (newEmail && newPhone) {
        const alreadyExists = Boolean(
          await prismaClient.user.findFirst({
            where: {
              OR: [{ email: newEmail }, { phone: newPhone }],
            },
            select: {
              id: true,
            },
          })
        );
        if (alreadyExists)
          return res
            .status(409)
            .json({ ok: false, error: "Email or Phone already taken" });
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            email: newEmail,
            phone: newPhone,
          },
        });
        return res.status(200).json({ ok: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error: String(error) });
    }
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
