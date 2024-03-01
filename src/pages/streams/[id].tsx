import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm } from "react-hook-form";
// LIBS
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
// COMPONENTS
import Layout from "@/components/layout";
import Message from "@/components/message";
import NotFound from "@/components/404-message";
// INTERFACE
import type { Stream } from "@prisma/client";

interface StreamWithMessages extends Stream {
  Messages: {
    id: number;
    message: string;
    user: {
      id: number;
      avatar: string | null;
    };
  }[];
}

interface IStreamResponse {
  ok: boolean;
  stream?: StreamWithMessages;
  error?: any;
}

export interface IMessageForm {
  message: string;
}

export default function Stream() {
  const { user } = useUser();
  const {
    query: { id },
  } = useRouter();

  // Fetch detail stream
  const { data, mutate } = useSWR<IStreamResponse>(
    id ? `/api/streams/${id}` : null,
    { refreshInterval: 1000 }
  );

  // Message <form>
  const { register, handleSubmit, reset } = useForm<IMessageForm>();
  const [sendMessage, { data: sendMessageData, isLoading }] = useMutation(
    `/api/streams/${id}/messages`
  );
  const onValid = (formData: IMessageForm) => {
    if (isLoading) return;
    mutate(
      (prev) =>
        user &&
        prev?.stream && {
          ...prev,
          stream: {
            ...prev.stream,
            Messages: [
              ...prev.stream.Messages,
              {
                id: Date.now(),
                message: formData.message,
                user: {
                  id: user.id,
                  avatar: user.avatar,
                },
              },
            ],
          },
        },
      false
    );
    sendMessage(formData); // DB
    reset();
  };

  return (
    <Layout canGoBack>
      {data && !data.ok ? (
        <NotFound />
      ) : (
        <div className="px-4 space-y-4">
          <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />

          <section className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.stream?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.stream?.price}
            </span>
            <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
          </section>

          {/* Live chat */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
            <div className="py-10 px-4 pb-16 h-[50vh] overflow-y-scroll space-y-4">
              {data?.stream?.Messages.map((msg) => (
                <Message
                  key={msg.id}
                  text={msg.message}
                  avatar={msg.user.avatar}
                  reversed={msg.user.id === user?.id ? true : false}
                  createdAt={null}
                />
              ))}
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="fixed py-2 bg-white  bottom-0 inset-x-0"
            >
              <div className="flex relative max-w-md items-center  w-full mx-auto">
                <input
                  {...register("message", { required: true })}
                  type="text"
                  className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
                  required
                />
                <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                  <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                    &rarr;
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      )}
    </Layout>
  );
}
