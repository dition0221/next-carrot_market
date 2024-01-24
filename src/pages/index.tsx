// LIBS
import useUser from "@/libs/client/useUser";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";

export default function Home() {
  const { user, isLoading } = useUser();
  console.log("user", user); // !!!

  return (
    <Layout title="홈" hasTabBar>
      <main className="flex flex-col space-y-5">
        {[...Array(10)].map((_, i) => (
          <Item
            title="New iPhone14"
            id={i}
            price={95}
            hearts={1}
            comments={1}
            key={i}
          />
        ))}

        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </main>
    </Layout>
  );
}
