import { SessionOptions, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

/*
  API Route에서 사용가능한 session값 가져오기
  기본형 : const 세션명 = await getSession(req, res);
*/

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PW!,
  cookieName: "carrot-session",
};

interface IIronSessionData {
  user?: {
    id: number; // USER id
  };
}

// Get session from API route
export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<IIronSessionData>(
    req,
    res,
    sessionOptions
  );

  return session;
}
