import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "My Blog",
  description: "Personal blog built with Next.js",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">My Blog</h1>
          <p className="text-gray-600">
            Thoughts, projects, and notes.
          </p>
        </header>

        {/* Posts */}
        <section className="space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b pb-8 last:border-none"
            >
              {/* Cover Image (optional) */}
              {post.cover && (
                <Link href={`/posts/${post.slug}`}>
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-56 object-cover rounded-lg mb-4"
                  />
                </Link>
              )}

              {/* Title */}
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 transition">
                  {post.title}
                </h2>
              </Link>

              {/* Date */}
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString()}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} My Blog
        </footer>
      </div>
    </main>
  );
}