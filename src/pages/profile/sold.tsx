import { getIronSession } from "iron-session";
// LIBS
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
import prismaClient from "@/libs/server/prismaClient";
// COMPONENTS
import Layout from "@/components/layout";
import ProductList, { type IProductList } from "@/components/product-list";
// INTERFACE
import type { GetServerSideProps } from "next";

export default function Sold({ ok, products, error }: IProductList) {
  return (
    <Layout title="판매내역" canGoBack seo="Sales list">
      <section className="flex flex-col">
        <ProductList kind="Sale" fallbackData={{ ok, products, error }} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const RECORDS_PER_PAGE = 10;

    // session
    const { user } = await getIronSession<IIronSessionData>(
      req,
      res,
      sessionOptions
    );
    if (!user) throw new Error("Please log-in");

    // DB
    const products = await prismaClient.record.findMany({
      where: {
        userId: user.id,
        kind: "Sale",
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
                Favorite: true,
              },
            },
          },
        },
      },
      take: RECORDS_PER_PAGE,
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
