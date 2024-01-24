import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "./getSession";

export interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

interface IWithHandlerProps {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void | any>;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: IWithHandlerProps) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<IResponseType>
  ) {
    // Check HTTP method
    if (req.method !== method) return res.status(405).end();

    // Check user exists to protect API route
    const session = await getSession(req, res);
    if (isPrivate && !session.user) {
      return res.status(401).json({ ok: false, error: "Please log-in." });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  };
}
