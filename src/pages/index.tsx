// LIBS
import prismaClient from "@/libs/server/prismaClient";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
// INTERFACE
import type { IProductList } from "@/pages/api/products";
import type { GetServerSideProps } from "next";

export default function Home({ ok, products, error }: IProductList) {
  // Fetch 'Product' list from DB
  const { data, ref, isLoading } = useInfiniteScroll<IProductList>(
    "/api/products",
    { ok, products, error }
  );

  return (
    <Layout title="홈" hasTabBar seo="Home">
      <section className="flex flex-col">
        {/* Product List */}
        {ok === false ? (
          <p className="text-center text-base italic text-gray-600">
            현재 중고 상품이 없습니다.
          </p>
        ) : null}
        {data?.map((page) =>
          page.products?.map((product) => (
            <Item
              id={product.id}
              title={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              hearts={product._count?.Favorites ?? 0}
              key={product.id}
              isLink
            />
          ))
        )}
      </section>

      {/* Infinite scroll */}
      {!isLoading ? <div ref={ref} /> : null}

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

export const getServerSideProps: GetServerSideProps = async () => {
  const PRODUCT_PER_PAGE = 10;

  try {
    const products = await prismaClient.product.findMany({
      include: {
        _count: {
          select: {
            Favorites: true,
          },
        },
      },
      take: PRODUCT_PER_PAGE,
    });
    if (products.length === 0) {
      return {
        props: {
          ok: false,
          error: "Not Found",
        },
      };
    }

    return {
      props: {
        ok: true,
        products: JSON.parse(JSON.stringify(products)),
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
