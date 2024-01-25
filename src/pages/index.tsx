import useSWR from "swr";
// LIBS
import useUser from "@/libs/client/useUser";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
// INTERFACE
import type { IProductResponse } from "./api/products";

export default function Home() {
  // Get 'User' session
  const { user, isLoading } = useUser();

  // Fetch 'Product' list from DB
  const { data } = useSWR<IProductResponse>("/api/products");

  return (
    <Layout title="홈" hasTabBar>
      <main className="flex flex-col space-y-5">
        {data?.products?.map((product) => (
          <Item
            title={product.name}
            id={product.id}
            price={product.price}
            hearts={1}
            comments={1}
            key={product.id}
          />
        ))}

        <FloatingButton href="/products/upload">
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
