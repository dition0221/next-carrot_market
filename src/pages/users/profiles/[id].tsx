import Image from "next/image";
// LIBS
import { getImage } from "@/libs/client/utils";
import prismaClient from "@/libs/server/prismaClient";
// COMPONENTS
import Layout from "@/components/layout";
import NotFoundPage from "@/components/404-page";
// INTERFACE
import type { GetStaticPaths, GetStaticProps } from "next";

interface IUserProfileProps {
  ok: boolean;
  profile?: {
    id: number;
    name: string;
    avatar: string | null;
    createdAt: string;
  };
  error?: string;
}

const formatJoinDate = (dateTime: string) => {
  const apiTime = new Date(dateTime);
  const convertedTime = new Date(apiTime.getTime());
  const formattedTime = convertedTime.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });

  return `${formattedTime} 가입`;
};

export default function UserProfile({ ok, profile, error }: IUserProfileProps) {
  return (
    <>
      {ok && profile ? (
        <Layout canGoBack title={"사용자 프로필"}>
          {/* Avatar */}
          <div className="mt-8 mx-auto relative w-1/2 aspect-square bg-slate-500 rounded-full">
            {profile.avatar ? (
              <Image
                src={getImage(profile.avatar, "public")}
                alt=""
                className="object-contain rounded-full"
                fill
                sizes="50vw, 50vh"
                priority
              />
            ) : null}
          </div>

          {/* Profile */}
          <p className="mt-4 text-center text-2xl font-semibold text-orange-500">
            {profile.name}
          </p>
          <p className="mt-4 text-center text-sm text-gray-800">
            {formatJoinDate(profile.createdAt)}
          </p>
        </Layout>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // userId
    const id = params?.id;
    if (typeof id !== "string") throw new Error("400 Params Error");

    // GET: user profile
    const profile = await prismaClient.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });
    if (!profile) throw new Error("404 Not Found");

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
