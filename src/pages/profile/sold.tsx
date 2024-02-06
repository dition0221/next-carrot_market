// COMPONENTS
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

export default function Sold() {
  return (
    <Layout title="판매내역" canGoBack>
      <section className="flex flex-col space-y-5">
        <ProductList kind="Sale" />
      </section>
    </Layout>
  );
}
