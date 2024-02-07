import Link from "next/link";

interface ILinkProfileProps {
  userName: string | undefined;
  href: string;
  isEdit?: boolean;
}

export default function LinkProfile({
  userName = "Undefined",
  href,
  isEdit,
}: ILinkProfileProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700">{userName}</p>
      <Link href={href} className="text-xs font-medium text-gray-500">
        {isEdit ? "Edit" : "View"} profile &rarr;
      </Link>
    </div>
  );
}
