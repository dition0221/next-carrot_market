import Link from "next/link";

interface ILinkProfileProps {
  userName: string;
  href: string;
}

export default function LinkProfile({ userName, href }: ILinkProfileProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700">{userName}</p>
      <Link href={href} className="text-xs font-medium text-gray-500">
        View profile &rarr;
      </Link>
    </div>
  );
}
