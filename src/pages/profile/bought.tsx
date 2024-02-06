// COMPONENTS
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

export default function Bought() {
  return (
    <Layout title="구매내역" canGoBack>
      <section className="flex flex-col space-y-5">
        <ProductList kind="Purchase" />
      </section>
    </Layout>
  );
}
