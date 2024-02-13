import { cls } from "@/libs/client/utils";

interface IMessageProps {
  text: string;
  reversed?: boolean;
}

export default function Message({ text, reversed }: IMessageProps) {
  return (
    <article
      className={cls(
        reversed ? "flex-row-reverse space-x-reverse" : "",
        "flex items-start space-x-2"
      )}
    >
      <div className="w-8 h-8 rounded-full bg-slate-400" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{text}</p>
      </div>
    </article>
  );
}
