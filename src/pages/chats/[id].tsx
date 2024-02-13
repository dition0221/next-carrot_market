import Layout from "@/components/layout";
import Message from "@/components/message";

export default function ChatDetail() {
  return (
    <Layout canGoBack>
      <main className="pb-16 px-4 space-y-4">
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />

        <form className="fixed py-2 bg-white  bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              required
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
}
