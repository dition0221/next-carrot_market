// LIBS
import { cls } from "@/libs/client/utils";

interface IButtonProps {
  text: string;
  full?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, full, onClick }: IButtonProps) {
  return (
    <button
      className={cls(
        full ? "w-full text-base py-3" : "text-sm py-2",
        "bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none transition"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
