import Link from "next/link";
import Image from "next/image";
// LIBS
import { formatTime, getImage } from "@/libs/client/utils";

interface IItemChildrenProps {
  title: string;
  price: number;
  imageUrl: string | null;
  hearts: number | null;
  date?: string;
}

function ItemChildren({
  title,
  price,
  imageUrl,
  hearts,
  date,
}: IItemChildrenProps) {
  return (
    <>
      <div className="flex space-x-4">
        {imageUrl ? (
          <Image
            src={getImage(imageUrl, "avatar")}
            alt="product image"
            className="w-20 h-22 rounded-md"
            width={80}
            height={80}
            priority
          />
        ) : (
          <div className="w-20 h-20 bg-gray-400 rounded-md" />
        )}
        <div className="pt-2 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="font-medium mt-1 text-gray-900">$ {price}</span>
        </div>
      </div>

      {hearts !== null ? (
        <div className="flex justify-end items-end space-x-1.5">
          <div className="flex items-center text-sm text-gray-600 space-x-0.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
        </div>
      ) : null}

      {date ? (
        <span className="flex items-end text-sm text-gray-600">
          <time dateTime={date} suppressHydrationWarning>
            {formatTime(date)}
          </time>
        </span>
      ) : null}
    </>
  );
}

interface IItemProps extends IItemChildrenProps {
  id: number;
  isLink: boolean;
}

export default function Item(props: IItemProps) {
  return props.isLink ? (
    <Link
      href={`/products/${props.id}`}
      className="flex justify-between border-b p-4 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
    >
      <ItemChildren {...props} />
    </Link>
  ) : (
    <li className="flex justify-between border-b p-4 rounded-lg hover:bg-slate-100 transition-colors">
      <ItemChildren {...props} />
    </li>
  );
}
