import { useRouter } from "next/router";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
// LIBS
import useMutation from "@/libs/client/useMutation";
import { cls, formatTime, getImage } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";
import prismaClient from "@/libs/server/prismaClient";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import LinkProfile from "@/components/link-profile";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { Answer, Post } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";

interface AnswerWithUser {
  id: number;
  answer: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

interface PostWithUser extends Post {
  user: {
    id: number;
    name: string;
    avatar: string | null;
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

interface IAnswerForm {
  answer: string;
}

interface IAnswerResponse {
  ok: boolean;
  answer?: Answer;
  error?: any;
}

export default function CommunityDetail({
  ok,
  post,
  error,
}: ICommunityPostRes) {
  const { id } = useRouter().query; // postId
  const { user } = useUser();

  // Get 'post' data
  const { data, mutate } = useSWR<ICommunityPostRes>(
    id ? `/api/posts/${id}` : null
  );

  // Mutate 'isWondering'
  const [wonder, { isLoading }] = useMutation(`/api/posts/${id}/wonder`);
  const [wonderCount, setWonderCount] = useState(post?._count.Wonderings ?? 0);
  const [isWondering, setIsWondering] = useState(false);
  useEffect(() => {
    if (data?.ok) setIsWondering(data.isWondering);
  }, [data?.isWondering, data?.ok]);
  const onWonderClick = () => {
    if (!data || isLoading) return;
    // if (!data || !data.post || isLoading) return;
    // mutate(
    //   {
    //     ...data,
    //     post: {
    //       ...data.post,
    //       _count: {
    //         ...data.post._count,
    //         Wonderings: data.isWondering
    //           ? data.post._count.Wonderings - 1
    //           : data.post._count.Wonderings + 1,
    //       },
    //     },
    //     isWondering: !data.isWondering,
    //   },
    //   false
    // );
    setIsWondering((prev) => !prev);
    setWonderCount((prev) => (isWondering ? prev - 1 : prev + 1));
    wonder({}); // DB
  };

  // Answer <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAnswerForm>();

  // Post 'answer' data
  const [replyCount, setReplyCount] = useState(post?._count.Answers ?? 0);
  const [sendAnswer, { data: answerData, isLoading: isAnswerLoading }] =
    useMutation<IAnswerResponse>(`/api/posts/${id}/answers`);
  const onValid = (formData: IAnswerForm) => {
    if (isAnswerLoading) return;
    sendAnswer(formData); // DB
  };
  useEffect(() => {
    if (answerData?.ok && answerData.answer && user) {
      reset();
      // Mutate 'reply'
      post?.Answers.push({
        id: answerData.answer.id,
        answer: answerData.answer.answer,
        createdAt: new Date(Date.now()).toISOString(),
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      });
      setReplyCount((prev) => prev + 1);
    }
  }, [answerData, post, reset, user]);

  return (
    <Layout canGoBack>
      <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문
      </span>

      {/* Profile */}
      <section className="px-4 py-3 mb-3 border-b">
        <LinkProfile
          avatar={post?.user.avatar}
          userName={post?.user.name}
          href={`/users/profiles/${post?.userId}`}
          px={40}
        />
      </section>

      <section>
        <div className="mt-2 px-4 text-gray-700">
          <span className="text-orange-500 font-medium">Q.&nbsp;</span>
          <span>{post?.question}</span>
          <p className="mt-2 text-xs text-gray-500">{post?.updatedAt + ""}</p>
        </div>
        <div className="flex px-4 space-x-6 mt-3 text-gray-700 py-2.5 border-t border-b-2 w-full">
          <button
            onClick={onWonderClick}
            className={cls(
              "flex space-x-1 items-center",
              isWondering ? "text-green-600" : ""
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
            <span>궁금해요 {wonderCount}</span>
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
            <span>답변 {replyCount}</span>
          </span>
        </div>
      </section>

      {/* Reply[] */}
      {post?.Answers && post?.Answers.length > 0 ? (
        <section className="px-4 py-5 space-y-5 border-b-2">
          {post?.Answers.map((answer) => (
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
                  {answer.createdAt}
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {/* Reply Form */}
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 space-y-2 mt-2 pt-2"
      >
        <Textarea
          register={register("answer", {
            required: "답변을 적어주세요.",
            minLength: {
              value: 5,
              message: "답변을 5자 이상 적어주세요.",
            },
          })}
          name="reply"
          label="Reply"
          placeholder="Answer this question!"
          required
        />
        {errors.answer?.message ? (
          <FormErrorMessage text={errors.answer.message} />
        ) : null}
        <Button text={isAnswerLoading ? "Loading.." : "Reply"} full />
      </form>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    // postId
    const id = ctx.params?.id;
    if (typeof id !== "string") throw new Error("Please only one params");

    // Get 'post'
    const post = await prismaClient.post.findUnique({
      where: {
        id: +id,
      },
      include: {
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
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        error: (error as Error).message || String(error),
      },
    };
  }
};
