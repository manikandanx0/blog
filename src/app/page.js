import Link from "next/link";
import { getPostsBySection } from "@/lib/posts";

export const metadata = {
  title: "Mani's Archive",
  description: "Thoughts. Systems. Obsessions.",
};

// Section display config — add new sections here as you create them
const SECTION_CONFIG = {
  posts:    { label: "Writing",          poemStyle: false },
  poems:    { label: "Poems",            poemStyle: true  },
  leetcode: { label: "LeetCode",         poemStyle: false },
  japanese: { label: "日本語 Notes",      poemStyle: false },
};

function getSectionLabel(section) {
  return SECTION_CONFIG[section]?.label ?? section.charAt(0).toUpperCase() + section.slice(1);
}

function isPoemStyle(section) {
  return SECTION_CONFIG[section]?.poemStyle ?? false;
}

export default function HomePage() {
  const sections = getPostsBySection();

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

      {/* ── SECTIONS ── */}
      {sections.map((group, gi) => (
        <section key={group.section} className="section">

          {/* ornament between sections */}
          {gi > 0 && (
            <div style={{
              textAlign: "center",
              fontFamily: "var(--f-stamp)",
              fontSize: "13px",
              letterSpacing: "0.3em",
              color: "var(--text-muted)",
              margin: "0 0 48px",
              opacity: 0.5,
            }}>— ✦ —</div>
          )}

          <div className="section-label">{getSectionLabel(group.section)}</div>

          {group.items.map((post, i) => (
            <article
              key={post.slug}
              className={`post-item${i === 0 && !isPoemStyle(group.section) ? " featured" : ""}`}
              style={isPoemStyle(group.section) ? { borderBottomStyle: "dashed" } : {}}
            >
              <div>
                <div className="post-category">{group.section}</div>
                <Link href={`/${post.slug}`}>
                  <h3 style={isPoemStyle(group.section) ? { fontStyle: "italic", fontWeight: 400 } : {}}>
                    {post.title}
                  </h3>
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
                <span className="post-num">
                  {isPoemStyle(group.section) ? `#p${i + 1}` : `#${String(i + 1).padStart(2, "0")}`}
                </span>
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))}
        </section>
      ))}

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