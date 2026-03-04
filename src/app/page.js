import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Mani's Archive",
  description: "Thoughts. Systems. Obsessions.",
};

export default function HomePage() {
  const posts = getAllPosts();

  const writings = posts.filter((p) => p.slug.startsWith("posts/"));
  const poems = posts.filter((p) => p.slug.startsWith("poems/"));

  return (
    <main className="container">

      {/* ── MASTHEAD ── */}
      <header>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "8px" }}>
          <span className="stamp" style={{ marginTop: "12px" }}>Issue 001</span>
          <h1>Mani's<br /><span style={{ color: "var(--accent-teal)" }}>Archive</span></h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
          <p className="label" style={{ margin: 0 }}>Thoughts · Systems · Obsessions</p>
          <div className="stamp-circle"><span>EST<br />2026</span></div>
        </div>

        <div className="divider-dash" style={{ marginTop: "20px" }} />
      </header>

      {/* ── POSTS ── */}
      <section className="section">
        <div className="section-label">Writing</div>

        {writings.length === 0 && (
          <p className="meta">No posts yet.</p>
        )}

        {writings.map((post, i) => (
          <article key={post.slug} className={`post-item${i === 0 ? " featured" : ""}`}>
            <div>
              <div className="post-category">{post.slug.split("/")[0]}</div>
              <Link href={`/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>
              {post.tags?.length > 0 && (
                <div className="tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <span className="post-num">#{String(i + 1).padStart(2, "0")}</span>
              <span className="post-date">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric",
                })}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* ── POEMS ── */}
      {poems.length > 0 && (
        <section className="section">
          <div className="ornament" style={{
            textAlign: "center",
            fontFamily: "var(--f-stamp)",
            fontSize: "13px",
            letterSpacing: "0.3em",
            color: "var(--text-muted)",
            margin: "48px 0",
            opacity: 0.5,
          }}>— ✦ —</div>

          <div className="section-label">Poems</div>

          {poems.map((post, i) => (
            <article key={post.slug} className="post-item" style={{ borderBottomStyle: "dashed" }}>
              <div>
                <div className="post-category">{post.slug.split("/")[0]}</div>
                <Link href={`/${post.slug}`}>
                  <h3 style={{ fontStyle: "italic", fontWeight: 400 }}>{post.title}</h3>
                </Link>
                {post.tags?.length > 0 && (
                  <div className="tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <span className="post-num">#p{i + 1}</span>
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="divider-heavy" style={{ marginTop: "80px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingTop: "24px",
        }}>
          <span className="label">Mani's Archive</span>
          <span className="meta" style={{ fontStyle: "italic", textTransform: "none", letterSpacing: "0.05em" }}>
            hand-typed · hand-sorted · hand-delivered
          </span>
        </div>
      </footer>

    </main>
  );
}