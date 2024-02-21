import Link from "next/link";
import useSWR from "swr";
// COMPONENTS
import Layout from "@/components/layout";

// TODO: 무한스크롤 적용하기
// TODO: 채팅방에 가장 최근 채팅 보여주기
// TODO: 최근 채팅이 있는 채팅방 순서대로 리스트 정렬하기

interface IChatRoomList {
  ok: boolean;
  chatRoomList?: {
    id: number;
    ChatRoomUsers: {
      user: {
        avatar: string | null;
        name: string;
      };
    }[];
  }[];
  error?: any;
}

export default function Chats() {
  // Fetch chat list
  const { data, isLoading } = useSWR<IChatRoomList>("/api/chats");

  return (
    <Layout title="채팅" hasTabBar>
      <main className="divide-y-[1px]">
        {data?.chatRoomList?.map((chatRoom) => (
          <Link
            href={`/chats/${chatRoom.id}`}
            key={chatRoom.id}
            className="px-4 py-3 flex items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">
                {chatRoom.ChatRoomUsers[0].user.name}
              </p>
              <p className="text-sm text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </Link>
        ))}
      </main>
    </Layout>
  );
}
