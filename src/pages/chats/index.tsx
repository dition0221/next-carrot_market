import Layout from "@/components/layout";
import Link from "next/link";

export default function Chats() {
  return (
    <Layout title="채팅" hasTabBar>
      <main className="divide-y-[1px]">
        {[...Array(6)].map((_, i) => (
          <Link
            href={`/chats/${i}`}
            key={i}
            className="px-4 py-3 flex items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jobs</p>
              <p className="text-sm text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </Link>
        ))}
      </main>
    </Layout>
  );
}
