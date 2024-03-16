import { getIronSession } from "iron-session";
// LIBS
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
// COMPONENTS
import Layout from "@/components/layout";
import ProductList, {
  type IFavoriteProductList,
} from "@/components/product-list";
// INTERFACE
import type { GetServerSideProps } from "next";

export default function Loved({ ok, products, error }: IFavoriteProductList) {
  return (
    <Layout title="관심목록" canGoBack seo="Interest list">
      <section className="flex flex-col">
        <ProductList kind="Favorite" fallbackData={{ ok, products, error }} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const FAVORITES_PER_PAGE = 10;

    // session
    const { user } = await getIronSession<IIronSessionData>(
      req,
      res,
      sessionOptions
    );
    if (!user) throw new Error("Please log-in");

    // DB
    const products = await prismaClient.favorite.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            _count: {
              select: {
                Favorites: true,
              },
            },
          },
        },
      },
      take: FAVORITES_PER_PAGE,
    });
    if (products.length === 0) throw new Error("Not Found");

    return {
      props: {
        ok: true,
        products,
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
