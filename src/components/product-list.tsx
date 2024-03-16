// LIBS
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
// COMPONENTS
import Item from "@/components/item";

export interface IFavoriteProductList {
  ok: boolean;
  products?: {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string | null;
      _count: {
        Favorites: number;
      };
    };
  }[];
  error?: string;
}

interface IFavoriteListProps {
  fallbackData: IFavoriteProductList | null;
}

function FavoriteList({ fallbackData }: IFavoriteListProps) {
  const { data, ref, isLoading } = useInfiniteScroll<IFavoriteProductList>(
    `/api/users/me/favorite`,
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
        page.products?.map((product) => (
          <Item
            key={product.id}
            id={product.product.id}
            title={product.product.name}
            price={product.product.price}
            imageUrl={product.product.imageUrl}
            hearts={product.product._count.Favorites}
            isLink
          />
        ))
      )}

      {/* Infinite scroll */}
      {!isLoading ? <div ref={ref} /> : null}
    </>
  );
}

export interface IRecordProductList {
  ok: boolean;
  products?: {
    id: number;
    name: string;
    price: number;
    createdAt: string;
  }[];
  error?: string;
}

interface IRecordListProps {
  kind: "Sale" | "Purchase";
  fallbackData: IRecordProductList | null;
}

function RecordList({ kind, fallbackData }: IRecordListProps) {
  const { data, ref, isLoading } = useInfiniteScroll<IRecordProductList>(
    `/api/users/me/records?kind=${kind}`,
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
            id={record.id}
            title={record.name}
            price={record.price}
            imageUrl={null}
            hearts={null}
            isLink={false}
            date={record.createdAt}
          />
        ))
      )}

      {/* Infinite scroll */}
      {!isLoading ? <div ref={ref} /> : null}
    </>
  );
}

interface IProductListProps {
  kind: "Sale" | "Purchase" | "Favorite";
  fallbackData: any | null;
}

export default function ProductList({ kind, fallbackData }: IProductListProps) {
  return (
    <>
      {kind === "Favorite" ? (
        <FavoriteList fallbackData={fallbackData} />
      ) : (
        <RecordList kind={kind} fallbackData={fallbackData} />
      )}
    </>
  );
}
