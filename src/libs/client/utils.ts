import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
// INTERFACE
import type { NextRouter } from "next/router";
import type { IResponseType } from "@/libs/server/withHandler";

/* Add classNames */
export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

/* Get image from Cloudflare */
type VariantName = "public" | "avatar";
export function getImage(imageId: string, variantName: VariantName) {
  return `https://imagedelivery.net/kk4YLvIogqMNHpBdH1Y55w/${imageId}/${variantName}`;
}

/* Format time */
export function formatTime(dateTime: string, isTimeAgo = false) {
  register("ko", koLocale);

  const apiTime = new Date(dateTime);
  const convertedTime = new Date(apiTime.getTime());
  const formattedTime = isTimeAgo
    ? format(convertedTime, "ko")
    : convertedTime.toLocaleString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Seoul",
      });

  return formattedTime;
}

/* Scroll to down fn. */
export function scrollToTop() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
  });
}

/* Delete image file in CF */
export async function deleteImage(imageId: string | null) {
  await fetch("/api/files", {
    method: "DELETE",
    body: imageId,
  });
}

/* fetch "DELETE" to DB */
interface IDeleteDbProps {
  apiURL: string;
  returnURL: string;
  errorContent: string;
  router: NextRouter;
}

export async function deleteDB({
  apiURL,
  returnURL,
  errorContent,
  router,
}: IDeleteDbProps) {
  try {
    const { ok, error } = (await (
      await fetch(`${apiURL}`, { method: "DELETE" })
    ).json()) as IResponseType;
    console.log(ok); // !!!

    if (ok) router.replace(`${returnURL}`, undefined, { shallow: true });
    else throw new Error(error);
  } catch (error) {
    alert(`${errorContent}\n${JSON.stringify(error)}`);
  }
}
