// COMPONENTS
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

export default function Loved() {
  return (
    <Layout title="관심목록" canGoBack>
      <section className="flex flex-col space-y-5">
        <ProductList kind="Favorite" />
      </section>
    </Layout>
  );
}
