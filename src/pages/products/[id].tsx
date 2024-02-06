import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
// LIBS
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import LinkProfile from "@/components/link-profile";
// INTERFACE
import type { Product, User } from "@prisma/client";

interface ProductWithUser extends Product {
  user: User;
}

interface IProductDetailResponse {
  ok: boolean;
  product?: ProductWithUser;
  isLiked?: boolean;
  relatedProducts?: Product[];
  error?: any;
}

export default function ProductDetail() {
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

  return (
    <Layout canGoBack>
      <main className="px-4">
        <section className="mb-8">
          <div className="h-96 bg-slate-300" />
          <article className="flex py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <LinkProfile
              userName={data?.product?.user.name ?? "Undefined"}
              href={`/users/profiles/${data?.product?.userId}`}
            />
          </article>

          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.product?.price}
            </span>
            <p className="my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex justify-between items-center space-x-2">
              <Button text="Talk to seller" full />
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
        {data?.relatedProducts ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-950">Similar items</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts?.map((product) => (
                <article key={product.id}>
                  <Link href={`${product.id}`}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ${product.price}
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
