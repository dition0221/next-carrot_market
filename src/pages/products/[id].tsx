import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
// LIBS
import useMutation from "@/libs/client/useMutation";
import { cls, getImage } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import LinkProfile from "@/components/link-profile";
// INTERFACE
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
}

interface IChatData {
  ok: boolean;
  chatRoomId?: number;
  error?: any;
}

export default function ProductDetail() {
  const { user } = useUser();

  // route parameter
  const router = useRouter();
  const { id } = router.query;

  // Fetch 'Product'
  // TODO: isLoading 화면, 데이터가 없는 경우 구현하기
  const { data, mutate: boundMutate } = useSWR<IProductDetailResponse>(
    id ? `/api/products/${id}` : null
  );

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
    if (!data?.product) return alert("상품이 존재하지 않습니다.");
    if (data.product.userId === user?.id)
      return alert("자신에게 채팅방을 만들 수 없습니다.");

    createChat({ product: data.product });
  };
  useEffect(() => {
    if (chatData?.ok) router.push(`/chats/${chatData.chatRoomId}`);
  }, [chatData, router]);

  return (
    <Layout canGoBack>
      <main className="px-4">
        <section className="mb-8">
          {/* Product image */}
          {data?.product?.imageUrl ? (
            <div className="relative w-full h-96">
              <Image
                src={getImage(data.product.imageUrl, "public")}
                alt="product image"
                className="object-contain bg-slate-200 rounded-md"
                fill={true}
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-slate-300 rounded-md" />
          )}

          {/* Seller's profile */}
          <article className="flex py-3 border-b items-center space-x-3">
            {data?.product?.user.avatar ? (
              <Image
                src={getImage(data.product.user.avatar, "avatar")}
                className="w-12 h-12 rounded-full"
                alt="avatar image"
                width={48}
                height={48}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-300" />
            )}
            <LinkProfile
              userName={data?.product?.user.name}
              href={`/users/profiles/${data?.product?.userId}`}
            />
          </article>

          {/* Product profile */}
          <div className="mt-5">
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
          </div>
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
      </main>
    </Layout>
  );
}
