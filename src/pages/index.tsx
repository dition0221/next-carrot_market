import useSWR from "swr";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
// INTERFACE
import type { IProductList } from "./api/products";

export default function Home() {
  // Fetch 'Product' list from DB
  const { data } = useSWR<IProductList>("/api/products");

  return (
    <Layout title="홈" hasTabBar>
      <section className="flex flex-col">
        {/* Product List */}
        {data?.ok === false ? (
          <p className="text-center text-sm text-slate-500">
            상품이 존재하지 않습니다.
          </p>
        ) : null}
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            title={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            hearts={product._count.Records}
            key={product.id}
          />
        ))}
      </section>

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
    </Layout>
  );
}
