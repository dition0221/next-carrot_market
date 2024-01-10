import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import Textarea from "@/components/textarea";

export default function CreateLive() {
  return (
    <Layout title="라이브 시작하기" canGoBack>
      <form className="px-4 space-y-4">
        <Input name="name" label="Name" type="text" required />
        <Input
          name="price"
          label="Price"
          type="number"
          placeholder="0.00"
          kind="price"
          required
        />
        <Textarea name="description" label="Description" />

        <Button text="Go Live" full />
      </form>
    </Layout>
  );
}
