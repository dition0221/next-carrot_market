import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "./getSession";

export interface IResponseType {
  ok: boolean;
  error?: any;
  [key: string]: any;
}

type Method = "GET" | "POST" | "DELETE";

interface IWithHandlerProps {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: IWithHandlerProps) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<IResponseType>
  ) {
    // Check HTTP method
    if (req.method && !methods.includes(req.method as Method))
      return res.status(405).end();

    // Check online user
    const { user } = await getSession(req, res);
    if (isPrivate && !user)
      return res.status(401).json({ ok: false, error: "Please log-in" });

    // Execute API handler
    await handler(req, res);
  };
}
