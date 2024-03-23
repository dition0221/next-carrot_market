import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { getIronSession } from "iron-session";
import { useEffect } from "react";
// LIBS
import prismaClient from "@/libs/server/prismaClient";
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
import usePagination from "@/libs/client/usePagination";
import useMutation from "@/libs/client/useMutation";
import { cls, formatTime, getImage } from "@/libs/client/utils";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import LinkProfile from "@/components/link-profile";
import FormErrorMessage from "@/components/form-error-msg";
import NotFoundPage from "@/components/404-page";
// INTERFACE
import type { GetServerSideProps } from "next";

interface Answer {
  id: number;
  answer: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

interface PostWithUser {
  id: true;
  createdAt: string;
  userId: number;
  question: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  Answers: Answer[];
  _count: {
    Answers: number;
    Wonderings: number;
  };
}

interface ICommunityDetailProps {
  ok: boolean;
  post?: PostWithUser;
  isWondering: boolean;
  error?: any;
  id: string;
}

interface IAnswerForm {
  answer: string;
}

interface IGetAnswersRes {
  ok: boolean;
  answers?: Answer[];
  error?: string;
}

interface IPostAnswerRes {
  ok: boolean;
  answer?: Answer;
  error?: any;
}

const ANSWERS_PER_PAGE = 5; // pagination

function CommunityDetail() {
  const { id } = useRouter().query; // postId

  // GET 'post' data
  const { data, mutate } = useSWR<ICommunityDetailProps>(
    id ? `/api/posts/${id}` : null
  );

  // GET 'answers' data
  const {
    data: answersData,
    size,
    getMoreFn,
  } = usePagination<IGetAnswersRes>({
    url: `/api/posts/${id}/answers`,
    idParams: id,
    fallback: { ok: true, ...data?.post?.Answers },
  });
  // const;

  // Mutate 'isWondering'
  const [wonder, { isLoading }] = useMutation(`/api/posts/${id}/wonder`);
  const onWonderClick = async () => {
    if (!data?.post || isLoading) return;
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
    await wonder({}); // DB
  };

  // Answer <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAnswerForm>();

  // POST 'answer' data
  const [sendAnswer, { data: postAnswerData, isLoading: isAnswerLoading }] =
    useMutation<IPostAnswerRes>(`/api/posts/${id}/answers`);
  const onValid = async (formData: IAnswerForm) => {
    if (isAnswerLoading) return;
    await sendAnswer(formData); // DB
  };
  useEffect(() => {
    // Mutate new 'answer'
    if (postAnswerData?.ok) {
      mutate();
      reset();
    }
  }, [postAnswerData?.ok, postAnswerData?.answer?.id, reset, mutate]);

  return (
    <Layout canGoBack seo={data?.post?.question ?? "Community Question"}>
      <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문
      </span>

      {/* Profile */}
      <section className="px-4 py-3 mb-3 border-b">
        <LinkProfile
          avatar={data?.post?.user.avatar}
          userName={data?.post?.user.name}
          href={`/users/profiles/${data?.post?.userId}`}
          px={40}
        />
      </section>

      <section>
        <div className="mt-2 px-4 text-gray-700">
          <span className="text-orange-500 font-medium">Q.&nbsp;</span>
          <span>{data?.post?.question}</span>
          <p className="mt-2 text-xs text-gray-500">
            <time
              dateTime={data?.post?.createdAt + ""}
              suppressHydrationWarning
            >
              {formatTime(data?.post?.createdAt + "", true)}
            </time>
          </p>
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
            <span>궁금해요 {data?.post?._count.Wonderings}</span>
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
            <span>답변 {data?.post?._count.Answers}</span>
          </span>
        </div>
      </section>

      {/* Reply[] */}
      {data?.post?.Answers && data.post.Answers.length > 0 ? (
        <section className="px-4 py-5 space-y-5 border-b-2">
          {(answersData?.[0].ok && answersData?.[0].answers
            ? answersData.flatMap((page) => page.answers!)
            : data?.post?.Answers!
          ).map((answer) => (
            <div className="flex items-start space-x-3" key={answer.id}>
              {answer.user.avatar ? (
                <Image
                  src={getImage(answer.user.avatar, "avatar")}
                  alt="answer avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8  bg-slate-400 rounded-full" />
              )}
              <div>
                <span className="text-sm block font-medium text-gray-800">
                  {answer.user.name}
                </span>
                <span className="text-xs font-normal text-gray-500 block">
                  <time dateTime={answer.createdAt} suppressHydrationWarning>
                    {formatTime(answer.createdAt, true)}
                  </time>
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
          {/* Event of reply pagination */}
          {ANSWERS_PER_PAGE * size < data.post._count.Answers ? (
            <button
              onClick={getMoreFn}
              className="w-full py-1 text-center text-white text-xs bg-slate-500 rounded-lg hover:bg-slate-600 transition-colors"
            >
              See more replies
            </button>
          ) : null}
        </section>
      ) : null}

      {/* Reply Form */}
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 space-y-2 mt-2 pt-2"
      >
        <Textarea
          register={register("answer", {
            required: "Please write a reply",
            minLength: {
              value: 5,
              message: "Please write a reply more than 5 characters",
            },
            maxLength: {
              value: 500,
              message: "Please write a reply less than 100 characters",
            },
          })}
          name="reply"
          label="Reply"
          placeholder="Answer this question!"
          required
          maxLength={500}
        />
        {errors.answer?.message ? (
          <FormErrorMessage text={errors.answer.message} />
        ) : null}
        <Button text={isAnswerLoading ? "Loading.." : "Reply"} full />
      </form>
    </Layout>
  );
}

export default function Page({
  ok,
  post,
  isWondering,
  error,
  id,
}: ICommunityDetailProps) {
  return (
    <>
      {ok ? (
        <SWRConfig
          value={{
            fallback: {
              [`/api/posts/${id}`]: {
                ok,
                post,
                isWondering,
                error,
              },
            },
          }}
        >
          <CommunityDetail />
        </SWRConfig>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  try {
    // postId
    const id = params?.id;
    if (typeof id !== "string") throw new Error("Please only one params");

    // session: user
    const { user } = await getIronSession<IIronSessionData>(
      req,
      res,
      sessionOptions
    );
    if (!user) throw new Error("Please log-in");

    // GET: 'isWondering' with session
    const isWondering = Boolean(
      await prismaClient.wondering.findFirst({
        where: {
          postId: +id,
          userId: user.id,
        },
        select: {
          id: true,
        },
      })
    );

    // GET: 'post'
    const post = await prismaClient.post.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        createdAt: true,
        userId: true,
        question: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        Answers: {
          select: {
            id: true,
            answer: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          take: ANSWERS_PER_PAGE,
        },
        _count: {
          select: {
            Answers: true,
            Wonderings: true,
          },
        },
      },
    });
    if (!post) throw new Error("404 Not Found");

    return {
      props: {
        ok: true,
        post: JSON.parse(JSON.stringify(post)),
        isWondering,
        id,
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
