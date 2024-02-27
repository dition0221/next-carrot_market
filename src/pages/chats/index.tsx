import Link from "next/link";
// LIBS
import { formatTime, getImage } from "@/libs/client/utils";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import Layout from "@/components/layout";
import Image from "next/image";

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
  // Fetch chat list (w. infinite scroll)
  const { data, ref, isLoading } =
    useInfiniteScroll<IChatRoomList>("/api/chats");

  return (
    <Layout title="채팅" hasTabBar>
      {/* Chat list */}
      <section>
        {data?.[0].ok === false ? (
          <p className="text-center text-base italic text-gray-600">
            현재 채팅방이 없습니다.
          </p>
        ) : null}

        {data?.map((page) =>
          page.chatRoomList?.map((chatRoom) => (
            <Link
              href={`/chats/${chatRoom.id}`}
              key={chatRoom.id}
              className="px-4 py-3 space-x-3 border-b-[1px] flex items-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              {chatRoom.ChatRoomUsers[0].user.avatar ? (
                <Image
                  src={getImage(
                    chatRoom.ChatRoomUsers[0].user.avatar,
                    "avatar"
                  )}
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
          ))
        )}
      </section>

      {/* Infinite scroll */}
      {!isLoading ? <div ref={ref} /> : null}
    </Layout>
  );
}
