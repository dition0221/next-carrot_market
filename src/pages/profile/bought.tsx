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

export default function Bought({ ok, products, error }: IProductList) {
  return (
    <Layout title="구매내역" canGoBack seo="Purchase list">
      <section className="flex flex-col">
        <ProductList kind="Purchase" fallbackData={{ ok, products, error }} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
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
        kind: "Purchase",
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
                Records: {
                  where: {
                    kind: "Purchase",
                  },
                },
              },
            },
          },
        },
      },
      take: 10,
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
