import Link from "next/link";
// LIBS
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
// INTERFACE
import type { Stream } from "@prisma/client";

interface IStreamsResponse {
  ok: boolean;
  streams?: Stream[];
  error?: any;
}

export default function Streams() {
  // Infinite scroll
  const { data, ref, isLoading } =
    useInfiniteScroll<IStreamsResponse>("/api/streams");

  return (
    <Layout title="라이브 스트리밍" hasTabBar>
      {/* Stream list */}
      <section className="divide-y-[1px] space-y-4">
        {data?.[0].ok === false ? (
          <p className="text-center text-base italic text-gray-600">
            현재 라이브가 없습니다.
          </p>
        ) : (
          data?.map((page) =>
            page.streams?.map((stream) => (
              <Link
                href={`/streams/${stream.id}`}
                key={stream.id}
                className="block p-4 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-full bg-slate-500 aspect-video rounded-md shadow-sm" />
                <h1 className="text-2xl mt-2 font-bold text-gray-900">
                  {stream.name}
                </h1>
              </Link>
            ))
          )
        )}
      </section>

      {/* Infinite scroll */}
      {isLoading ? (
        <p className="text-center italic text-gray-500 text-sm">Loading..</p>
      ) : (
        <div ref={ref} />
      )}

      <FloatingButton href="/streams/create">
        <svg
          className="w-6 h-6"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
}
