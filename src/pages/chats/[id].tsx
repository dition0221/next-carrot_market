import { getIronSession } from "iron-session";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
// LIBS
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/client/useMutation";
import { deleteDB, scrollToTop } from "@/libs/client/utils";
// COMPONENTS
import Layout from "@/components/layout";
import Message from "@/components/message";
import usePagination from "@/libs/client/usePagination";
// INTERFACE
import type { GetServerSideProps } from "next";
import type { User } from "@prisma/client";

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

interface IChatRoomResponse {
  ok: boolean;
  chatRoom?: {
    id: number;
    ChatRoomUsers: {
      // [0] (상대방)만 사용할 것
      user: {
        name: string;
      };
    }[];
    product: {
      user: {
        id: number; // 판매자 id
      };
    };
    _count: {
      Chats: number;
    };
  };
  error?: any;
}

interface IPageProps extends IChatRoomResponse {
  id: string | string[] | undefined;
  profile: User | null;
}

function ChatDetail() {
  const MESSAGES_PER_PAGE = 10; // pagination
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  // Check authorization of chat room
  const { data: chatRoomData, isLoading: isChatRoomLoading } =
    useSWR<IChatRoomResponse>(id ? `/api/chats/${id}` : null);
  if (chatRoomData && !chatRoomData.ok) router.replace("/chats");

  /* GET: Read chats */
  const { data, size, mutate, isLoading, getMoreFn } =
    usePagination<IChatsResponse>({
      url: `/api/chats/${id}/chats`,
      idParams: id,
    });

  /* POST: Write a chat */
  const [postChat, { isLoading: isWriteLoading }] = useMutation(
    `/api/chats/${id}/chats`
  );
  const { register, handleSubmit, reset } = useForm<IWriteChatForm>();
  const onValid = (formData: IWriteChatForm) => {
    if (isWriteLoading || isLoading) return;

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
    scrollToTop();
    reset();
  };

  // Chat menu fn.
  const onConfirmProduct = async () => {
    if (isChatRoomLoading || isLoading) return;

    const isConfirm = confirm(
      "Are you sure to confirm purchase of this product?"
    );
    if (!isConfirm) return;

    // TODO: Add 판매내역/구매내역

    // Delete product from DB
    await deleteDB({
      apiURL: `/api/products/${id}`,
      returnURL: "/",
      errorContent: "Error: Fail to delete product",
      router,
    });
  };
  const onExitChatRoom = async () => {
    if (isChatRoomLoading || isLoading) return;

    const isConfirm = confirm("Are you sure to exit this chatroom?");
    if (!isConfirm) return;

    // Delete chatRoom from DB
    await deleteDB({
      apiURL: `/api/chats/${id}`,
      returnURL: "/chats",
      errorContent: "Error: Fail to delete chat room",
      router,
    });
  };

  return (
    <Layout
      canGoBack
      title={chatRoomData?.chatRoom?.ChatRoomUsers?.[0].user.name}
      seo={`Chat w.${chatRoomData?.chatRoom?.ChatRoomUsers?.[0].user.name}`}
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
                  userId={chat.user.id}
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

        {/* Menu bar */}
        <div className="flex justify-between items-center border-2 px-4 py-2 text-sm border-gray-300 rounded-lg bg-orange-100 shadow-md">
          {user?.id === chatRoomData?.chatRoom?.product.user.id ? (
            <span className="font-semibold text-gray-700">
              구매완료를 부탁하세요
            </span>
          ) : (
            <button
              onClick={onConfirmProduct}
              className="flex items-center space-x-2 text-green-600 hover:underline"
            >
              <span className="font-semibold">구매확정</span>
              <svg
                className="w-4 h-4 fill-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </button>
          )}
          <button
            onClick={onExitChatRoom}
            className="flex items-center space-x-2 text-red-500 hover:underline"
          >
            <span className="font-semibold">나가기</span>
            <svg
              className="w-4 h-4 fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </button>
        </div>
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

      {/* Event of pagination */}
      {MESSAGES_PER_PAGE * size <
      (chatRoomData?.chatRoom?._count.Chats ?? 0) ? (
        <button
          onClick={getMoreFn}
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

export default function Page({ ok, chatRoom, error, id, profile }: IPageProps) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/chats/${id}`]: {
            ok,
            chatRoom,
            error,
          },
          "/api/users/me": {
            ok,
            profile,
          },
        },
      }}
    >
      <ChatDetail />
    </SWRConfig>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  try {
    // URL Parameter
    const chatRoomId = params?.id;
    if (!chatRoomId) throw new Error("Only one dynamicParam is allowed");

    // Session
    const { user } = await getIronSession<IIronSessionData>(
      req,
      res,
      sessionOptions
    );
    if (!user) throw new Error("Please log-in");

    // Get user profile
    const profile = await prismaClient.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!profile) throw new Error("Not found user");

    // Get 'chatroom' data
    const chatRoom = await prismaClient.chatRoom.findFirst({
      where: {
        id: +chatRoomId,
        ChatRoomUsers: {
          some: {
            user: {
              id: user.id,
            },
          },
        },
      },
      select: {
        id: true,
        ChatRoomUsers: {
          where: {
            userId: {
              not: user.id,
            },
          },
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        product: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        _count: {
          select: {
            Chats: true,
          },
        },
      },
    });
    if (!chatRoom) throw new Error("Not Found");

    return {
      props: {
        ok: true,
        chatRoom: JSON.parse(JSON.stringify(chatRoom)),
        id: +chatRoomId,
        profile: JSON.parse(JSON.stringify(profile)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        error: (error as Error).message || JSON.stringify(error),
      },
    };
  }
};
