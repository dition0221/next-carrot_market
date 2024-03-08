import { NextApiRequest, NextApiResponse } from "next";
// LIBS
import withHandler, { IResponseType } from "@/libs/server/withHandler";

export interface ICloudflareUrl {
  ok: boolean;
  url?: string;
  error?: any;
}

export interface IUploadImage {
  errors: {
    code: number;
    message: string;
  }[];
  messages: any[];
  result: {
    filename: string;
    id: string;
    requireSignedURLs: boolean;
    uploaded: string;
    variants: string[];
  } | null;
  success: boolean;
}

interface ICloudflareResponse {
  success: boolean;
  // Success
  result?: {
    id: string;
    uploadURL: string;
  };
  messages?: any[];
  // Fail
  errors: {
    code: number;
    message: string;
  }[];
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  // GET: CloudFlare URL
  if (req.method === "GET") {
    try {
      const cloudflareResponse = (await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.CF_TOKEN}`,
            },
          }
        )
      ).json()) as ICloudflareResponse;

      if (!cloudflareResponse.success)
        return res.status(500).json({
          ok: cloudflareResponse.success,
          error:
            cloudflareResponse.errors.length > 0
              ? cloudflareResponse.errors[0].message
              : "Cloudflare Error",
        });

      return res.status(200).json({
        ok: cloudflareResponse.success,
        url: cloudflareResponse.result?.uploadURL,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }

  // DELETE: Delete image in CF
  if (req.method === "DELETE") {
    const imageId = req.body;

    try {
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/${imageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CF_TOKEN}`,
          },
        }
      );
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}

export default withHandler({
  methods: ["GET", "DELETE"],
  handler,
});
