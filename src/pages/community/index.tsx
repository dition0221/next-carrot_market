// LIBS
import prismaClient from "@/libs/server/prismaClient";
import useCoords from "@/libs/client/useCoords";
import { formatTime } from "@/libs/client/utils";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import Link from "next/link";
// INTERFACE
import type { Post } from "@prisma/client";
import type { GetStaticProps } from "next";

interface PostWithUser extends Post {
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  _count: {
    Wonderings: number;
    Answers: number;
  };
}

interface IPostList {
  ok: boolean;
  posts?: PostWithUser[];
  error?: any;
}

export default function Community({ ok, posts, error }: IPostList) {
  const { data, ref, isLoading } = useInfiniteScroll<IPostList>("/api/posts", {
    ok,
    posts,
    error,
  });

  return (
    <Layout title="동네생활" hasTabBar seo="Community">
      <section>
        {ok === false ? (
          <p className="text-center text-base italic text-gray-600">
            현재 포스트가 없습니다.
          </p>
        ) : null}
        {data?.map((page) =>
          page.posts?.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="flex flex-col items-start pt-4 cursor-pointer rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                동네질문
              </span>
              <div className="mt-2 px-4 text-gray-700">
                <span className="text-orange-500 font-medium">Q. </span>
                <span>
                  {post.question.length > 50
                    ? post.question.slice(0, 60) + "..."
                    : post.question}
                </span>
              </div>
              <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span>{post.user.name}</span>
                <span>{formatTime(post.createdAt + "", true)}</span>
              </div>
              <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-2 w-full">
                <span className="flex space-x-2 items-center">
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
                  <span>궁금해요 {post._count.Wonderings}</span>
                </span>
                <span className="flex space-x-2 items-center">
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
                  <span>답변 {post._count.Answers}</span>
                </span>
              </div>
            </Link>
          ))
        )}

        {/* Infinite scroll */}
        {!isLoading ? <div ref={ref} /> : null}

        <FloatingButton href="/community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /*
  // Get user's coordination
  const { latitude, longitude } = useCoords();

  // Get 'post' list
  const { data } = useSWR<IPostList>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  */

  try {
    const posts = await prismaClient.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Wonderings: true,
            Answers: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });
    if (posts.length === 0) throw new Error("Not Found");

    return {
      props: {
        ok: true,
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        error: (error as Error).message || error,
      },
    };
  }
};
