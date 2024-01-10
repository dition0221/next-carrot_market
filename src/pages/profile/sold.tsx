import Item from "@/components/item";
import Layout from "@/components/layout";

export default function Sold() {
  return (
    <Layout title="판매내역" canGoBack>
      <main className="flex flex-col space-y-5">
        {[...Array(10)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="New iPhone 14"
            price={99}
            hearts={1}
            comments={1}
          />
        ))}
      </main>
    </Layout>
  );
}
