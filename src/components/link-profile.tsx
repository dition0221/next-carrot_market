import { getImage } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface ILinkProfileProps {
  avatar: string | undefined | null;
  userName: string | undefined;
  href: string;
  px: number;
  isEdit?: boolean;
}

export default function LinkProfile({
  avatar,
  userName = "Undefined",
  href,
  px,
  isEdit,
}: ILinkProfileProps) {
  return (
    <article className="flex items-center space-x-3">
      {avatar ? (
        <Image
          src={getImage(avatar, "avatar")}
          alt="avatar image"
          width={px}
          height={px}
          className="rounded-full border"
          priority
        />
      ) : (
        <div className={`w-${px / 4} h-${px / 4} rounded-full bg-slate-300`} />
      )}
      <div>
        <p className="text-sm font-semibold text-gray-700">{userName}</p>
        <Link
          href={href}
          className="text-xs font-medium text-gray-500 rounded-md hover:bg-slate-100 hover:px-2 transition-all"
        >
          {isEdit ? "Edit" : "View"} profile &rarr;
        </Link>
      </div>
    </article>
  );
}
