export default function Chats() {
  return (
    <main className="py-10 divide-y-[1px]">
      {[...Array(6)].map((_, i) => (
        <article
          key={i}
          className="flex px-4 py-3 items-center space-x-3 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-gray-700">Steve Jobs</p>
            <p className="text-sm text-gray-500">
              See you tomorrow in the corner at 2pm!
            </p>
          </div>
        </article>
      ))}
    </main>
  );
}
