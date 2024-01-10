import Link from "next/link";
import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";

export default function Live() {
  return (
    <Layout title="라이브" hasTabBar>
      <main className="divide-y-[1px] space-y-4">
        {[...Array(5)].map((_, i) => (
          <Link href={`live/${i}`} key={i} className="block pt-4 px-4">
            <div className="w-full bg-slate-500 aspect-video rounded-md shadow-sm" />
            <h1 className="text-2xl mt-2 font-bold text-gray-900">
              Galaxy S50
            </h1>
          </Link>
        ))}

        <FloatingButton href="/live/create">
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
      </main>
    </Layout>
  );
}
