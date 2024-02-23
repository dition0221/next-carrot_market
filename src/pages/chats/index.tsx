import Link from "next/link";
import useSWR from "swr";
// LIBS
import { formatTime, getImage } from "@/libs/client/utils";
// COMPONENTS
import Layout from "@/components/layout";
import Image from "next/image";

// TODO: 무한스크롤 적용하기
// TODO: 최근 채팅이 있는 채팅방 순서대로 리스트 정렬하기

interface IChatRoomUser {
  user: {
    avatar: string | null;
    name: string;
  };
}

interface IChatRoomList {
  ok: boolean;
  chatRoomList?: {
    id: number;
    ChatRoomUsers: IChatRoomUser[]; // 무조건 '[0]' 상대방을 사용할 것
    Chats: { content: string; createdAt: string }[];
  }[];
  error?: any;
}

export default function Chats() {
  // Fetch chat list
  const { data, isLoading } = useSWR<IChatRoomList>("/api/chats");

  return (
    <Layout title="채팅" hasTabBar>
      <section>
        {data?.chatRoomList?.map((chatRoom) => (
          <Link
            href={`/chats/${chatRoom.id}`}
            key={chatRoom.id}
            className="px-4 py-3 space-x-3 border-b-[1px] flex items-center "
          >
            {chatRoom.ChatRoomUsers[0].user.avatar ? (
              <Image
                src={getImage(chatRoom.ChatRoomUsers[0].user.avatar, "avatar")}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border border-slate-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-300" />
            )}
            <div className="w-full">
              <p className="text-gray-700">
                {chatRoom.ChatRoomUsers[0].user.name}
              </p>
              {chatRoom.Chats.length !== 0 ? (
                <p className="flex justify-between text-sm text-gray-500">
                  <span>
                    {chatRoom.Chats[0].content.length > 10
                      ? chatRoom.Chats[0].content.slice(0, 10) + "..."
                      : chatRoom.Chats[0].content}
                  </span>
                  <span>{formatTime(chatRoom.Chats[0].createdAt, true)}</span>
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
