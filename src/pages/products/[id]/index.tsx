import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
// SESSION
import { getIronSession } from "iron-session";
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
// LIBS
import useMutation from "@/libs/client/useMutation";
import { cls, deleteDB, deleteImage, getImage } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";
import prismaClient from "@/libs/server/prismaClient";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import LinkProfile from "@/components/link-profile";
import NotFoundPage from "@/components/404-page";
// INTERFACE
import type { GetServerSideProps } from "next";
import type { Product, User } from "@prisma/client";

export interface ProductWithUser extends Product {
  user: User;
}

interface IProductDetailResponse {
  ok: boolean;
  product?: ProductWithUser;
  isLiked?: boolean;
  relatedProducts?: Product[];
  error?: any;
  id?: string;
}

interface IChatData {
  ok: boolean;
  chatRoomId?: number;
  error?: any;
}

function ProductDetail() {
  const { user } = useUser();

  // route parameter
  const router = useRouter();
  const { id } = router.query;

  // Fetch 'Product'
  const { data, mutate: boundMutate } = useSWR<IProductDetailResponse>(
    id ? `/api/products/${id}` : null
  );
  useEffect(() => {
    // If not data
    if (data?.ok === false) router.replace("/");
  }, [data?.ok, router]);

  // Click 'Favorite'
  const [toggleFav, { isLoading: isToggleLoading }] = useMutation(
    `/api/products/${id}/favorite`
  );
  const onFavoriteClick = () => {
    if (isToggleLoading) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({}); // DB
  };

  // Click 'Talk to seller' button
  const [createChat, { isLoading: isChatLoading, data: chatData }] =
    useMutation<IChatData>("/api/chats");
  const talkToSeller = () => {
    if (isChatLoading) return;
    if (!data?.product) return alert("Product is not exist");
    if (data.product.userId === user?.id) return alert("Can't to talk myself");

    createChat({ product: data.product });
  };
  useEffect(() => {
    if (chatData?.ok) router.push(`/chats/${chatData.chatRoomId}`);
  }, [chatData, router]);

  // Delete product
  const onDeleteProduct = async () => {
    if (!data?.product) return;
    if (user?.id !== data?.product?.userId) return;

    // Check from user
    const isDelete = confirm("Are you sure to delete this product?");
    if (!isDelete) return;

    // Delete image from CF
    await deleteImage(data.product.imageUrl);

    // Delete from DB
    await deleteDB({
      apiURL: `/api/products/${id}`,
      returnURL: "/",
      errorContent: "Error: Fail to delete product",
      router,
    });
  };

  return (
    <Layout canGoBack seo={data?.product?.name ?? "Product"}>
      <div className="px-4">
        <section className="mb-8">
          {/* Product image */}
          {data?.product?.imageUrl ? (
            <article className="mb-3 relative w-full h-96">
              <Image
                src={getImage(data.product.imageUrl, "public")}
                alt="product image"
                className="object-contain bg-slate-200 rounded-md"
                fill={true}
                sizes="480px"
                priority
              />
            </article>
          ) : (
            <article className="mb-3 w-full h-96 bg-slate-300 rounded-md" />
          )}

          {/* Seller's profile */}
          <LinkProfile
            avatar={data?.product?.user.avatar}
            userName={data?.product?.user.name}
            href={`/users/profiles/${data?.product?.userId}`}
            px={48}
          />

          {/* Edit / Delete */}
          {data?.product?.userId === user?.id ? (
            <article className="mt-4 space-x-2">
              <Link
                href={`/products/${id}/edit`}
                className="px-3 text-white rounded-lg bg-blue-500 hover:bg-blue-600 inline-block"
              >
                Edit
              </Link>
              <button
                onClick={onDeleteProduct}
                className="px-3 text-white rounded-lg bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </article>
          ) : null}

          {/* Product profile */}
          <article className="mt-3 pt-5 border-t">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              $ {data?.product?.price}
            </span>
            <p className="my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex justify-between items-center space-x-2">
              <Button
                onClick={talkToSeller}
                text={isChatLoading ? "Loading.." : "Talk to seller"}
                full
              />
              <button
                onClick={onFavoriteClick}
                className={cls(
                  "p-3 flex place-items-center rounded-md hover:bg-gray-100",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill={data?.isLiked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </article>
        </section>

        {/* Similar Items */}
        {data?.relatedProducts && data.relatedProducts.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-950">Similar items</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {data.relatedProducts.map((product) => (
                <article key={product.id}>
                  <Link href={`${product.id}`}>
                    {product.imageUrl ? (
                      <div className="relative h-56 w-full">
                        <Image
                          src={getImage(product.imageUrl, "public")}
                          alt={`${product.name}'s image`}
                          className="object-contain bg-slate-200 rounded-md"
                          fill={true}
                        />
                      </div>
                    ) : (
                      <div className="h-56 w-full mb-4 bg-slate-300 rounded-md" />
                    )}
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      $ {product.price}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}

export default function Page({
  ok,
  product,
  isLiked,
  relatedProducts,
  id,
  error,
}: IProductDetailResponse) {
  return (
    <>
      {ok ? (
        <SWRConfig
          value={{
            fallback: {
              [`/api/products/${id}`]: {
                ok,
                product,
                isLiked,
                relatedProducts,
                error,
              },
            },
          }}
        >
          <ProductDetail />
        </SWRConfig>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  // productId
  const id = params?.id;
  if (typeof id !== "string")
    throw new Error("Only one dynamicParam is allowed");

  // session: user
  const { user } = await getIronSession<IIronSessionData>(
    req,
    res,
    sessionOptions
  );
  if (!user) throw new Error("Please log-in");

  try {
    // GET 'Product'
    const product = await prismaClient.product.findUnique({
      where: { id: +id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    if (!product) throw new Error("404 Not Found");

    // GET 'similar Product'
    const terms = product.name
      .split(" ")
      .filter((word) => word !== "") // Except blank
      .map((word) => ({
        name: {
          contains: word,
        },
      }));
    const relatedProducts = await prismaClient.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: +id,
          },
        },
      },
    });

    // GET 'Favorite'
    const isLiked = Boolean(
      await prismaClient.favorite.findFirst({
        where: {
          productId: +id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    return {
      props: {
        ok: true,
        product: JSON.parse(JSON.stringify(product)),
        isLiked,
        relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
        id,
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
