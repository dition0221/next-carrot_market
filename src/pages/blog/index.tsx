import { readFileSync, readdirSync } from "fs";
import Link from "next/link";
import matter from "gray-matter";
// COMPONENTS
import Layout from "@/components/layout";

interface IBlogProps {
  posts: {
    title: string;
    date: string;
    category: string;
    slug: string;
  }[];
}

export default function Blog({ posts }: IBlogProps) {
  return (
    <Layout title="Blog" seo="Blog">
      <h1 className="my-10 text-center font-semibold text-lg">
        Latest Posts :
      </h1>
      <ul className="space-y-5">
        {posts.map((post, idx) => (
          <li key={idx}>
            <Link href={`/blog/${post.slug}`}>
              <p className="text-lg text-red-500">{post.title}</p>
              <span>
                {post.date} / {post.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export function getStaticProps() {
  // Get '.md' files (normal node.js)
  const blogPosts = readdirSync("src/posts").map((file) => {
    const content = readFileSync(`src/posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
}
