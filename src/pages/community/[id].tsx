import { useRouter } from "next/router";
import useSWR from "swr";
// LIBS
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import LinkProfile from "@/components/link-profile";
// INTERFACE
import type { Post } from "@prisma/client";

interface AnswerWithUser {
  id: number;
  answer: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

interface PostWithUser extends Post {
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  Answers: AnswerWithUser[];
  _count: {
    Answers: number;
    Wonderings: number;
  };
}

interface ICommunityPostRes {
  ok: boolean;
  post?: PostWithUser;
  isWondering: boolean;
  error?: any;
}

export default function CommunityDetail() {
  const { id } = useRouter().query; // postId

  // Get 'post' data
  const { data, mutate } = useSWR<ICommunityPostRes>(
    id ? `/api/posts/${id}` : null
  );

  // Wondering
  const [wonder] = useMutation(`/api/posts/${id}/wonder`);
  const onWonderClick = () => {
    if (!data || !data.post) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            Wonderings: data.isWondering
              ? data.post._count.Wonderings - 1
              : data.post._count.Wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    wonder({}); // DB
  };

  return (
    <Layout canGoBack>
      <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문
      </span>

      <section className="flex px-4 py-3 mb-3 border-b items-center space-x-3 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-slate-300" />
        <LinkProfile
          userName={data?.post?.user.name ?? "Undefined"}
          href={`/users/profiles/${data?.post?.userId}`}
        />
      </section>

      <section>
        <div className="mt-2 px-4 text-gray-700">
          <span className="text-orange-500 font-medium">Q.&nbsp;</span>
          {data?.post?.question}
        </div>
        <div className="flex px-4 space-x-6 mt-3 text-gray-700 py-2.5 border-t border-b-2 w-full">
          <button
            onClick={onWonderClick}
            className={cls(
              "flex space-x-1 items-center",
              data?.isWondering ? "text-green-600" : ""
            )}
          >
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>궁금해요 {data?.post?._count.Wonderings ?? 0}</span>
          </button>
          <span className="flex space-x-1 items-center">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>답변 {data?.post?._count.Answers ?? 0}</span>
          </span>
        </div>
      </section>

      {/* Reply */}
      {data?.post?.Answers && data?.post?.Answers.length > 0 ? (
        <section className="px-4 my-5 space-y-5">
          {data?.post?.Answers.map((answer) => (
            <div className="flex items-start space-x-3" key={answer.id}>
              <div className="w-8 h-8  bg-slate-400 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block">
                  {answer.createdAt}
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <form className="px-4 space-y-2 mt-2">
        <Textarea
          name="reply"
          label="Reply"
          placeholder="Answer this question!"
          required
        />
        <Button text="Reply" full />
      </form>
    </Layout>
  );
}
