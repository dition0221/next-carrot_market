import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

// Add classNames
export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

// Get image from Cloudflare
type VariantName = "public" | "avatar";
export function getImage(imageId: string, variantName: VariantName) {
  return `https://imagedelivery.net/kk4YLvIogqMNHpBdH1Y55w/${imageId}/${variantName}`;
}

// Format time
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
