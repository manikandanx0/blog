import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      {posts.map((post) => (
        <div key={post.slug} className="mb-4">
          <Link
            href={`/posts/${post.slug}`}
            className="text-xl text-blue-600"
          >
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      ))}
    </main>
  );
}