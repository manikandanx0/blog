import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export default async function Post({ params }) {
  const { slug } = await params;

  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return notFound();

  const processed = await remark()
    .use(html, { sanitize: false })
    .process(post.content);

  const contentHtml = processed.toString();

  const category = slugPath.split("/")[0];

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="container">

      {/* ── BACK LINK ── */}
      <Link href="/" className="back-link">
        ← Back to Archive
      </Link>

      {/* ── POST HEADER ── */}
      <header style={{ marginBottom: "40px", paddingBottom: "24px", borderBottom: "2px solid var(--divider)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ color: "var(--accent)" }}>▸</span>
          <span className="label" style={{ color: "var(--accent-teal)" }}>{category}</span>
          <span className="stamp" style={{ marginLeft: "8px" }}>{formattedDate}</span>
        </div>

        <h1>{post.title}</h1>

        <p className="meta" style={{ marginTop: "12px", fontStyle: "normal" }}>
          {formattedDate} · Mani
        </p>

        {post.tags?.length > 0 && (
          <div className="tags" style={{ marginTop: "12px" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>

      {/* ── POST BODY ── */}
      <div className="post-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* ── END MARK ── */}
      <div style={{
        fontFamily: "var(--f-stamp)",
        fontSize: "12px",
        letterSpacing: "0.2em",
        color: "var(--text-muted)",
        marginTop: "56px",
        opacity: 0.6,
      }}>
        — end —
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: "64px", borderTop: "3px double var(--divider)", paddingTop: "24px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
      }}>
        <Link href="/" className="back-link">← Back to Archive</Link>
        <span className="meta" style={{ fontStyle: "italic", textTransform: "none", letterSpacing: "0.05em" }}>
          Mani's Archive
        </span>
      </footer>

    </main>
  );
}