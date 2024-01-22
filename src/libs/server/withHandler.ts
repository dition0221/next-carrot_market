import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Check HTTP method
    if (req.method !== method) return res.status(405).end();

    try {
      await fn(req, res); // execute handler fn.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}