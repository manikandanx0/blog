import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const { slug } = await params;   // important

  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const processed = await remark()
    .use(html)
    .process(post.content);

  const contentHtml = processed.toString();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div className="mb-4 flex gap-2 flex-wrap">
  {post.tags.map((tag) => (
    <span
      key={tag}
      className="text-xs bg-gray-200 px-2 py-1 rounded"
    >
      #{tag}
    </span>
  ))}
</div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}