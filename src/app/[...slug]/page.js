import { getAllPosts, getAllSections } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

// Pre-generate both post pages AND section index pages
export async function generateStaticParams() {
  const posts = getAllPosts();
  const sections = getAllSections();

  const postParams = posts.map((post) => ({
    slug: post.slug.split("/"),
  }));

  const sectionParams = sections.map((section) => ({
    slug: [section],
  }));

  return [...postParams, ...sectionParams];
}

export default async function Post({ params }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  const allPosts = getAllPosts();

  // Try to match a post first
  const post = allPosts.find((p) => p.slug === slugPath);

  if (post) {
    const processed = await remark()
      .use(html, { sanitize: false })
      .process(post.content);

    const contentHtml = processed.toString();
    const category = slugPath.split("/")[0];
    const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
      day: "2-digit", month: "long", year: "numeric",
    });

    return (
      <main className="container">

        <Link href="/" className="back-link">← Back to Archive</Link>

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

        <div className="post-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        <div style={{
          fontFamily: "var(--f-stamp)",
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
          marginTop: "56px",
          opacity: 0.6,
        }}>— end —</div>

        <footer style={{
          marginTop: "64px",
          borderTop: "3px double var(--divider)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <Link href="/" className="back-link">← Back to Archive</Link>
          <span className="meta" style={{ fontStyle: "italic", textTransform: "none", letterSpacing: "0.05em" }}>
            Mani's Archive
          </span>
        </footer>

      </main>
    );
  }

  // Try to match a section index page
  const sections = getAllSections();
  const isSection = sections.includes(slugPath);

  if (isSection) {
    const sectionPosts = allPosts.filter((p) => p.slug.startsWith(`${slugPath}/`));

    return (
      <main className="container">

        <Link href="/" className="back-link">← Back to Archive</Link>

        <header style={{ marginBottom: "40px" }}>
          <h1>{slugPath.charAt(0).toUpperCase() + slugPath.slice(1)}</h1>
          <div className="divider-dash" style={{ marginTop: "16px" }} />
        </header>

        <section>
          <div className="section-label">{sectionPosts.length} entries</div>

          {sectionPosts.map((post, i) => (
            <article key={post.slug} className={`post-item${i === 0 ? " featured" : ""}`}>
              <div>
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

        <footer style={{
          marginTop: "64px",
          borderTop: "3px double var(--divider)",
          paddingTop: "24px",
        }}>
          <Link href="/" className="back-link">← Back to Archive</Link>
        </footer>

      </main>
    );
  }

  return notFound();
}