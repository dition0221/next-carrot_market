import { cls, getImage } from "@/libs/client/utils";
import Image from "next/image";

interface IMessageProps {
  text: string;
  avatar: string | null;
  reversed?: boolean;
}

// TODO: session으로부터 자기자신의 아바타 이미지 가져오기

export default function Message({ text, avatar, reversed }: IMessageProps) {
  return (
    <article
      className={cls(
        reversed ? "flex-row-reverse space-x-reverse" : "",
        "flex items-start space-x-2"
      )}
    >
      {avatar ? (
        <Image
          src={getImage(avatar, "avatar")}
          alt="avatar image"
          width={32}
          height={32}
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      )}
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{text}</p>
      </div>
    </article>
  );
}
