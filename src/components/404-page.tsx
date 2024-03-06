// COMPONENTS
import Layout from "@/components/layout";

export default function NotFoundPage() {
  return (
    <Layout canGoBack title="Not Found">
      <p className="font-bold text-center text-2xl underline text-red-500">
        404: Not Found
      </p>
    </Layout>
  );
}
