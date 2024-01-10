import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";

export default function CommunityWrite() {
  return (
    <Layout title="질문 등록하기" canGoBack>
      <form className="px-4 space-y-4">
        <Textarea
          name="question"
          label="Question"
          placeholder="Ask a question!"
          required
        />
        <Button text="Submit" full />
      </form>
    </Layout>
  );
}
