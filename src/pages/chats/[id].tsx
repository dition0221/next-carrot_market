import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
// LIBS
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { scrollToDown } from "@/libs/client/utils";
// COMPONENTS
import Layout from "@/components/layout";
import Message from "@/components/message";

export interface IWriteChatForm {
  chat: string;
}

interface IChats {
  content: string;
  createdAt: string;
  id: number;
  user: {
    avatar: string | null;
    id: number;
  };
}

interface IChatsResponse {
  ok: boolean;
  chats?: IChats[];
}

interface ICheckChatRoom {
  ok: boolean;
  chatRoom?: {
    id: number;
    ChatRoomUsers: {
      user: {
        name: string;
      };
    }[]; // [0] (상대방)만 사용할 것
  };
  error?: any;
}

export default function ChatDetail() {
  const { user } = useUser();

  const router = useRouter();
  const { id } = router.query;

  // Check authorization of chat room
  const { data: chatRoomData } = useSWR<ICheckChatRoom>(
    id ? `/api/chats/${id}` : null
  );
  if (chatRoomData && !chatRoomData.ok) router.replace("/chats");

  /* GET: Read chats */
  const [isMoreEnd, setIsMoreEnd] = useState(false);
  const getKey = (pageIndex: number, prevData: IChatsResponse) => {
    // if 'ok: false', Reached the end
    if (prevData && (prevData as any).ok === false) {
      setIsMoreEnd(true);
      return null;
    }
    return id ? `/api/chats/${id}/chats?page=${pageIndex}` : null;
  };
  const { data, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<IChatsResponse>(getKey);
  const isReadLoading = isLoading || isValidating;
  // pagination
  const getMoreChats = () => {
    if (isReadLoading || isMoreEnd) return;
    setSize((prev) => prev + 1);
  };

  /* POST: Write a chat */
  const [postChat, { isLoading: isWriteLoading }] = useMutation(
    `/api/chats/${id}/chats`
  );
  const { register, handleSubmit, reset } = useForm<IWriteChatForm>();
  const onValid = (formData: IWriteChatForm) => {
    if (isWriteLoading || isReadLoading) return;

    mutate(
      (prev) =>
        prev && [
          {
            ok: true,
            chats: [
              ...(prev[0].chats as any),
              {
                content: formData.chat,
                createdAt: Date.now(),
                id: Date.now(),
                user: {
                  avatar: user?.avatar,
                  id: user?.id,
                },
              },
            ],
          },
          ...prev.slice(1),
        ],
      false
    );
    postChat(formData); // DB
    scrollToDown();
    reset();
  };

  return (
    <Layout
      canGoBack
      title={chatRoomData?.chatRoom?.ChatRoomUsers?.[0].user.name}
    >
      {/* Chats */}
      <section className="pb-32 px-4 space-y-4">
        {data &&
          [...data]
            .reverse()
            .map((page) =>
              page.chats?.map((chat) => (
                <Message
                  key={chat.id}
                  text={chat.content}
                  createdAt={chat.createdAt}
                  avatar={chat.user.avatar}
                  reversed={chat.user.id === user?.id ? true : false}
                />
              ))
            )}
        {data?.[0]?.ok && data[0]?.chats?.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            채팅을 시작해보세요.
          </p>
        ) : null}
      </section>

      {/* Chat form */}
      <form
        onSubmit={handleSubmit(onValid)}
        className="fixed py-2 bg-white bottom-0 inset-x-0"
      >
        <div className="flex relative max-w-md items-center w-full mx-auto">
          <input
            {...register("chat", {
              required: true,
              maxLength: 100,
            })}
            type="text"
            className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            required
            maxLength={100}
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600">
              <svg
                className="fill-white w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* pagination */}
      {(data?.[size - 1]?.chats ?? []).length >= 10 ? (
        <button
          onClick={getMoreChats}
          className="fixed top-14 left-0 right-0 mx-auto w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center hover:bg-gray-600 transition-colors shadow-md"
        >
          <svg
            className="w-2/3 h-2/3 fill-gray-600 hover:fill-gray-300 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
        </button>
      ) : null}
    </Layout>
  );
}
