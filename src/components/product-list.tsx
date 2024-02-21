import useSWR from "swr";
// COMPONENTS
import Item from "@/components/item";
// INTERFACE
import type { Record } from "@prisma/client";
import type { ProductWithCount } from "@/pages/api/products/index";

interface ProductWithRecord extends Record {
  product: ProductWithCount;
}

interface IProductList {
  ok: boolean;
  products?: ProductWithRecord[];
}

interface IProductListProps {
  kind: "Sale" | "Purchase" | "Favorite";
}

export default function ProductList({ kind }: IProductListProps) {
  const { data } = useSWR<IProductList>(`/api/users/me/records?kind=${kind}`);

  return (
    <>
      {data?.products?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          imageUrl={record.product.imageUrl}
          hearts={record.product._count.Records}
        />
      ))}
    </>
  );
}
