import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "My Blog",
  description: "Personal blog built with Next.js",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="container">
      <header className="section">
        <h1>Mani’s Archive</h1>
        <p className="meta">Thoughts. Systems. Obsessions.</p>
        <hr />
      </header>

      <section className="section">
        {posts.map((post) => (
          <article key={post.slug} className="post-item">
            <Link href={`/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>

            <p className="meta">
              {new Date(post.date).toLocaleDateString()}
            </p>

            {post.tags?.length > 0 && (
              <div className="meta">
                {post.tags.map((tag) => (
                  <span key={tag} style={{ marginRight: "12px" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <hr />
          </article>
        ))}
      </section>
    </main>
  );
}