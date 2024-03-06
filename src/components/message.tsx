import Image from "next/image";
// LIBS
import { cls, formatTime, getImage } from "@/libs/client/utils";
import Link from "next/link";

interface IMessageProps {
  userId: number;
  text: string;
  avatar: string | null;
  createdAt: string | null;
  reversed?: boolean;
}

export default function Message({
  userId,
  text,
  avatar,
  createdAt,
  reversed,
}: IMessageProps) {
  return (
    <li
      className={cls(
        reversed ? "flex-row-reverse space-x-reverse" : "",
        "flex items-start space-x-2"
      )}
    >
      <Link href={`/users/profiles/${userId}`}>
        {avatar ? (
          <Image
            src={getImage(avatar, "avatar")}
            alt="avatar image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border border-slate-300"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-400" />
        )}
      </Link>
      <div className="w-1/2">
        <p className="w-full text-sm text-gray-700 p-2 border border-gray-300 rounded-md break-words">
          {text}
        </p>
        {createdAt ? (
          <p
            className={cls(
              reversed ? "text-right" : "",
              "text-xs text-gray-500"
            )}
          >
            {formatTime(createdAt)}
          </p>
        ) : null}
      </div>
    </li>
  );
}
