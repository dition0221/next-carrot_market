import type { GetStaticPaths, GetStaticPropsContext } from "next";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Layout from "@/components/layout";

interface IPostProps {
  data: {
    title: string;
    date: string;
    category: string;
  };
  post: string;
}

export default function Post({ data, post }: IPostProps) {
  return (
    <Layout title={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { data, content } = matter.read(`src/posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      data,
      post: value,
    },
  };
}
