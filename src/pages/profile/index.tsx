import Link from "next/link";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { getIronSession } from "iron-session";
// LIBS
import useUser, { type IUserResponse } from "@/libs/client/useUser";
import { cls, formatTime, getImage } from "@/libs/client/utils";
import prismaClient from "@/libs/server/prismaClient";
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
// COMPONENTS
import Layout from "@/components/layout";
import LinkProfile from "@/components/link-profile";
import NotFoundPage from "@/components/404-page";
// INTERFACE
import type { GetServerSideProps } from "next";

interface IReviewList {
  ok: boolean;
  reviews?: {
    id: number;
    createdAt: string;
    review: string;
    score: number;
    createdBy: {
      id: number;
      name: string;
      avatar: string | null;
    };
  }[];
  error?: any;
}

function Profile() {
  // Profile
  const { user } = useUser();

  // Review List
  const { data: reviewData } = useSWR<IReviewList>("/api/reviews");

  return (
    <Layout title="나의 캐럿" hasTabBar seo="My profile">
      <div className="px-4">
        {/* Profile */}
        {user ? (
          <LinkProfile
            avatar={user?.avatar}
            userName={user?.name}
            href="/profile/edit"
            px={64}
            isEdit
          />
        ) : null}

        {/* Lists */}
        <section className="mt-10 flex justify-around">
          <Link href="/profile/sold" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">
              판매내역
            </span>
          </Link>
          <Link href="/profile/bought" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">
              구매내역
            </span>
          </Link>
          <Link href="/profile/loved" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">
              관심목록
            </span>
          </Link>
        </section>

        {/* Received review list */}
        {reviewData?.reviews?.length ? (
          <section className="mt-12 border-t pt-6 space-y-12">
            {reviewData?.reviews?.map((review) => (
              <article key={review.id}>
                <div className="flex items-center space-x-4">
                  {review.createdBy.avatar ? (
                    <Link href={`/users/profiles/${review.createdBy.id}`}>
                      <Image
                        src={getImage(review.createdBy.avatar, "avatar")}
                        alt="reviewer's avatar"
                        width={48}
                        height={48}
                        className="border rounded-full"
                      />
                    </Link>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-400" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {review.createdBy.name}
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cls(
                            "h-5 w-5",
                            review.score > i
                              ? "text-yellow-400"
                              : "text-gray-400"
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                    <time dateTime={review.createdAt} suppressHydrationWarning>
                      {formatTime(review.createdAt, true)}
                    </time>
                  </span>
                  <span className="text-gray-700 text-sm">{review.review}</span>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </Layout>
  );
}

export default function Page({ ok, profile, error }: IUserResponse) {
  return (
    <>
      {ok ? (
        <SWRConfig
          value={{
            fallback: {
              "/api/users/me": {
                ok,
                profile,
                error,
              },
            },
          }}
        >
          <Profile />
        </SWRConfig>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    // session
    const { user } = await getIronSession<IIronSessionData>(
      req!,
      res!,
      sessionOptions
    );
    if (!user) throw new Error("Please log-in");

    // GET: user data
    const profile = await prismaClient.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (!profile) throw new Error("Not found profile");

    return {
      props: {
        ok: true,
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
