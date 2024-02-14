import Link from "next/link";
import useSWR from "swr";
import InfiniteScroll from "react-infinite-scroller";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
// INTERFACE
import type { Stream } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import { useEffect, useState } from "react";

interface IStreamsResponse {
  ok: boolean;
  streams?: Stream[];
  error?: any;
}

/* const getKey = (pageIndex: number, previousPageData: IStreamsResponse) => {
  // if 'ok: false', Reached the end
  if (previousPageData && !previousPageData.ok) {
    setIsMore(false);
    return null;
  }
  return `/api/streams?page=${pageIndex}`;
};
const { data, size, setSize, isLoading } =
  useSWRInfinite<IStreamsResponse>(getKey);*/

export default function Streams() {
  const [pageIdx, setPageIdx] = useState(0);

  // Fetch data
  const [streamList, setStreamList] = useState<Stream[]>([]);
  const { data, isLoading } = useSWR<IStreamsResponse>(
    `/api/streams?page=${pageIdx}`
  );
  useEffect(() => {
    if (data?.ok) {
      setStreamList((prev) => [...prev, ...data.streams!]);
    }
  }, [data?.ok, data?.streams]);

  // Scroll fn.
  const [isMore, setIsMore] = useState(true);
  useEffect(() => {
    if (data && !data.ok) {
      setIsMore(false);
    }
  }, [data]);
  const loadMoreFn = () => {
    if (isMore && !isLoading) {
      setPageIdx((prev) => prev + 1);
    }
  };

  console.log("streamList", streamList); // !!!

  return (
    <Layout title="라이브 스트리밍" hasTabBar>
      <div className="divide-y-[1px] space-y-4">
        <InfiniteScroll
          className="overflow-auto"
          loadMore={loadMoreFn}
          hasMore={isMore}
          loader={
            <div
              className="my-2 text-center text-sm italic text-gray-500"
              key={0}
            >
              Loading..
            </div>
          }
        >
          {streamList.map((stream) => (
            <Link
              href={`/streams/${stream.id}`}
              key={stream.id}
              className="block pt-4 px-4"
            >
              <div className="w-full bg-slate-500 aspect-video rounded-md shadow-sm" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </Link>
          ))}
        </InfiniteScroll>

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
      </div>
    </Layout>
  );
}
