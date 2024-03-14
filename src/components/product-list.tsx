// LIBS
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import Item from "@/components/item";

export interface IProductList {
  ok: boolean;
  products?: {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string | null;
      _count: {
        Favorite: number;
      };
    };
  }[];
  error?: string;
}

interface IProductListProps {
  kind: "Sale" | "Purchase" | "Favorite";
  fallbackData: IProductList | null;
}

export default function ProductList({ kind, fallbackData }: IProductListProps) {
  const { data, ref, isLoading } = useInfiniteScroll<IProductList>(
    kind === "Favorite"
      ? `/api/users/me/favorite`
      : `/api/users/me/records?kind=${kind}`,
    fallbackData
  );

  return (
    <>
      {data?.[0].ok === false ? (
        <p className="text-center italic text-gray-600 text-sm">
          상품목록이 없습니다
        </p>
      ) : null}
      {data?.map((page) =>
        page.products?.map((record) => (
          <Item
            key={record.id}
            id={record.product.id}
            title={record.product.name}
            price={record.product.price}
            imageUrl={record.product.imageUrl}
            hearts={record.product._count.Favorite}
            isLink={kind === "Favorite" ? true : false}
          />
        ))
      )}

      {/* Infinite scroll */}
      {!isLoading ? <div ref={ref} /> : null}
    </>
  );
}
