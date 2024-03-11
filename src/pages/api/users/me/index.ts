import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";
import prismaClient from "@/libs/server/prismaClient";
import { getSession } from "@/libs/server/getSession";

interface IEditProfile {
  name: string;
  email?: string;
  phone?: string;
  avatarId?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { user } = await getSession(req, res);
  if (!user) return res.status(401).json({ ok: false, error: "Please log-in" });

  /* GET: Get user's profile */
  if (req.method === "GET") {
    try {
      const profile = await prismaClient.user.findUnique({
        where: { id: user?.id },
      });
      if (!profile)
        return res.status(404).json({ ok: false, error: "404 Not Found" });

      return res.status(200).json({ ok: true, profile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: true, error: JSON.stringify(error) });
    }
  }

  /* POST: Edit user's profile */
  if (req.method === "POST") {
    try {
      const { name, email, phone, avatarId }: IEditProfile = req.body;

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
      if (!currentUser)
        return res.status(404).json({ ok: false, error: "Not Found" });

      // New values
      const newEmail = email && email !== currentUser.email ? email : undefined;
      const newPhone = phone && phone !== currentUser.phone ? phone : undefined;
      const newValues: any = {};
      if (newEmail) newValues.email = newEmail;
      if (newPhone) newValues.phone = newPhone;
      if (name !== currentUser.name) newValues.name = name;
      if (avatarId) newValues.avatar = avatarId;

      // 1) Check duplication: email
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
      }

      // 2) Check duplication: phone
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
      }

      // 3) Check duplication: email & phone
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
      }

      // Update DB
      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...newValues,
        },
      });

      // SSG(ODR) Update
      await res.revalidate(`/users/profiles/${user.id}`);

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        error: (error as Error).message || JSON.stringify(error),
      });
    }
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
