import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export default async function Post({ params }) {
  // ✅ MUST unwrap params
  const { slug } = await params;

  const slugPath = Array.isArray(slug)
    ? slug.join("/")
    : slug;

  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return notFound();

  const processed = await remark()
    .use(html)
    .process(post.content);

  const contentHtml = processed.toString();

  return (
    <main className="container">
      <h1>{post.title}</h1>
      <p className="meta">{post.date}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}