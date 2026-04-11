import { useEffect, useState } from "react";

const API = "http://localhost:8000/api/blogs";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function calcReadTime(content = "") {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function mapBlog(raw) {
  return {
    id:       raw._id || raw.id,
    title:    raw.title || "Untitled",
    excerpt:  raw.content
      ? raw.content.slice(0, 160) + (raw.content.length > 160 ? "..." : "")
      : "",
    category: raw.category || "General",
    tag:      Array.isArray(raw.tags) ? raw.tags[0] : raw.tags || raw.category || "Post",
    date:     formatDate(raw.createdAt),
    readTime: calcReadTime(raw.content),
    image:    raw.image || null,   // Cloudinary URL direct
  };
}

const PALETTE = [
  { bg: "#e8f4fd", text: "#1a6fa8", dot: "#3b9de8" },
  { bg: "#f0ebfe", text: "#6235c1", dot: "#8b5cf6" },
  { bg: "#e6faf3", text: "#0e7a52", dot: "#10b981" },
  { bg: "#fef3e8", text: "#b45309", dot: "#f59e0b" },
  { bg: "#fde8f0", text: "#9d1f5a", dot: "#ec4899" },
];
const colorCache = {};
let colorIdx = 0;
function getColor(cat) {
  if (!colorCache[cat]) { colorCache[cat] = PALETTE[colorIdx % PALETTE.length]; colorIdx++; }
  return colorCache[cat];
}

const tagStyle = {
  display: "inline-block", fontSize: "11px", fontWeight: 600,
  letterSpacing: "0.08em", textTransform: "uppercase",
  padding: "3px 10px", borderRadius: "99px", marginBottom: "14px",
};

export default function HomeBlogs() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState("All");
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.blogs ?? [];
        setBlogs(list.map(mapBlog));
      })
      .catch((err) => console.error("Blogs fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const filtered   = active === "All" ? blogs : blogs.filter((b) => b.category === active);
  const featured   = filtered[0];
  const rest       = filtered.slice(1);

  return (
    <section style={styles.section}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Writing & Thoughts</p>
          <h2 style={styles.heading}>
            From the <span style={styles.headingAccent}>notebook</span>
          </h2>
        </div>
        <p style={styles.subtext}>
          Essays on engineering, design, and the craft of building software that people love.
        </p>
      </div>

      {/* Filter tabs */}
      {!loading && blogs.length > 0 && (
        <div style={styles.tabs}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{ ...styles.tab, ...(active === cat ? styles.tabActive : {}) }}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* States */}
      {loading ? (
        <div style={styles.grid}>
          {[1, 2, 3].map((n) => <div key={n} style={styles.skeleton} />)}
        </div>

      ) : filtered.length === 0 ? (
        <p style={styles.empty}>
          {blogs.length === 0 ? "No blog posts found." : "No posts in this category yet."}
        </p>

      ) : (
        <>
          {/* ── Featured (pehla blog bada) ── */}
          <div
            style={{ ...styles.featured, ...(hovered === "featured" ? styles.featuredHover : {}) }}
            onMouseEnter={() => setHovered("featured")}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Colored left accent bar */}
            <div style={{ ...styles.featuredAccent, background: getColor(featured.category).dot }} />

            <div style={styles.featuredLayout}>
              {/* Image — left side agar image hai */}
              {featured.image && (
                <div style={styles.featuredImgWrap}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    style={styles.featuredImg}
                    onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                  />
                </div>
              )}

              {/* Text content */}
              <div style={styles.featuredContent}>
                <span style={{
                  ...tagStyle,
                  background: getColor(featured.category).bg,
                  color: getColor(featured.category).text,
                }}>
                  {featured.tag}
                </span>
                <h3 style={styles.featuredTitle}>{featured.title}</h3>
                <p style={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div style={styles.meta}>
                  <span style={styles.metaDate}>{featured.date}</span>
                  <span style={styles.metaDot}>·</span>
                  <span style={styles.metaRead}>{featured.readTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <div style={styles.featuredArrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Grid (baaki blogs) ── */}
          {rest.length > 0 && (
            <div style={styles.grid}>
              {rest.map((blog) => {
                const colors    = getColor(blog.category);
                const isHovered = hovered === blog.id;
                return (
                  <div key={blog.id}
                    style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
                    onMouseEnter={() => setHovered(blog.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Card image — top */}
                    {blog.image ? (
                      <div style={styles.cardImgWrap}>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          style={styles.cardImg}
                          onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                        />
                      </div>
                    ) : (
                      /* Fallback colored banner jab image na ho */
                      <div style={{ ...styles.cardImgFallback, background: colors.bg }}>
                        <span style={{ fontSize: "28px", opacity: 0.5 }}>✍</span>
                      </div>
                    )}

                    <div style={styles.cardBody}>
                      <div style={{ ...styles.cardDot, background: colors.dot }} />
                      <span style={{ ...tagStyle, background: colors.bg, color: colors.text }}>
                        {blog.tag}
                      </span>
                      <h4 style={styles.cardTitle}>{blog.title}</h4>
                      <p style={styles.cardExcerpt}>{blog.excerpt}</p>
                      <div style={styles.cardFooter}>
                        <div style={styles.meta}>
                          <span style={styles.metaDate}>{blog.date}</span>
                          <span style={styles.metaDot}>·</span>
                          <span style={styles.metaRead}>{blog.readTime}</span>
                        </div>
                        <span style={{ ...styles.readMore, color: colors.text }}>Read →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Footer CTA */}
      <div style={styles.cta}>
        <span style={styles.ctaLine} />
        <button style={styles.ctaBtn}>View all posts</button>
        <span style={styles.ctaLine} />
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "1100px", margin: "0 auto",
    padding: "80px 24px", fontFamily: "'Georgia', serif",
  },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-end", marginBottom: "48px",
    gap: "32px", flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "12px", fontFamily: "'Courier New', monospace",
    letterSpacing: "0.15em", textTransform: "uppercase",
    color: "#999", margin: "0 0 10px",
  },
  heading: {
    fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700,
    lineHeight: 1.05, margin: 0, color: "#111", fontFamily: "'Georgia', serif",
  },
  headingAccent: { fontStyle: "italic", color: "#6235c1" },
  subtext: {
    fontSize: "16px", color: "#666", maxWidth: "340px",
    lineHeight: 1.65, margin: 0, fontFamily: "'Georgia', serif",
  },

  /* tabs */
  tabs: { display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" },
  tab: {
    padding: "8px 20px", borderRadius: "99px",
    border: "1.5px solid #e5e5e5", background: "transparent",
    cursor: "pointer", fontSize: "13px", fontWeight: 500, color: "#555",
    fontFamily: "'Courier New', monospace", letterSpacing: "0.04em",
    transition: "all 0.18s ease",
  },
  tabActive: { background: "#111", color: "#fff", border: "1.5px solid #111" },

  /* featured */
  featured: {
    position: "relative", border: "1.5px solid #e8e8e8",
    borderRadius: "16px", marginBottom: "24px",
    cursor: "pointer", overflow: "hidden",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    background: "#fff",
  },
  featuredHover: { borderColor: "#c4b5f4", transform: "translateY(-2px)" },
  featuredAccent: {
    position: "absolute", top: 0, left: 0,
    width: "4px", height: "100%", borderRadius: "16px 0 0 16px", zIndex: 1,
  },
  featuredLayout: {
    display: "flex", alignItems: "stretch", gap: "0",
  },
  featuredImgWrap: {
    flexShrink: 0, width: "280px", minHeight: "220px",
    overflow: "hidden",
  },
  featuredImg: {
    width: "100%", height: "100%",
    objectFit: "cover", display: "block",
  },
  featuredContent: {
    flex: 1, padding: "36px 32px 36px 36px",
  },
  featuredTitle: {
    fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700,
    color: "#111", margin: "0 0 12px", lineHeight: 1.25,
    fontFamily: "'Georgia', serif",
  },
  featuredExcerpt: {
    fontSize: "15px", color: "#666", lineHeight: 1.7,
    margin: "0 0 20px", fontFamily: "'Georgia', serif",
  },
  featuredArrow: {
    flexShrink: 0, color: "#aaa",
    display: "flex", alignItems: "flex-start",
    padding: "36px 28px 0 0",
  },

  /* grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px", marginBottom: "56px",
  },

  /* card */
  card: {
    position: "relative", border: "1.5px solid #e8e8e8",
    borderRadius: "14px", cursor: "pointer", overflow: "hidden",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    background: "#fff", display: "flex", flexDirection: "column",
  },
  cardHover: { borderColor: "#c4b5f4", transform: "translateY(-3px)" },

  /* card image */
  cardImgWrap: {
    width: "100%", height: "180px", overflow: "hidden", flexShrink: 0,
  },
  cardImg: {
    width: "100%", height: "100%",
    objectFit: "cover", display: "block",
    transition: "transform 0.3s ease",
  },
  cardImgFallback: {
    width: "100%", height: "140px", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },

  cardBody: {
    padding: "22px 24px 18px", display: "flex",
    flexDirection: "column", flex: 1, position: "relative",
  },
  cardDot: {
    position: "absolute", top: "22px", right: "22px",
    width: "8px", height: "8px", borderRadius: "50%",
  },
  cardTitle: {
    fontSize: "17px", fontWeight: 700, color: "#111",
    margin: "0 0 10px", lineHeight: 1.35, fontFamily: "'Georgia', serif",
  },
  cardExcerpt: {
    fontSize: "14px", color: "#777", lineHeight: 1.65,
    margin: "0 0 16px", fontFamily: "'Georgia', serif", flex: 1,
  },
  cardFooter: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    borderTop: "1px solid #f0f0f0", paddingTop: "12px", marginTop: "auto",
  },

  /* meta */
  meta: { display: "flex", alignItems: "center", gap: "6px" },
  metaDate: { fontSize: "12px", color: "#aaa", fontFamily: "'Courier New', monospace" },
  metaDot: { color: "#ccc", fontSize: "12px" },
  metaRead: { fontSize: "12px", color: "#aaa", fontFamily: "'Courier New', monospace" },
  readMore: { fontSize: "13px", fontWeight: 600, fontFamily: "'Courier New', monospace", letterSpacing: "0.02em" },

  /* loading & empty */
  skeleton: {
    border: "1.5px solid #f0f0f0", borderRadius: "14px", height: "300px",
    background: "linear-gradient(90deg,#f7f7f7 25%,#efefef 50%,#f7f7f7 75%)",
    backgroundSize: "200% 100%",
  },
  empty: {
    color: "#999", textAlign: "center", padding: "3rem 0",
    fontFamily: "'Courier New', monospace", fontSize: "14px",
  },

  /* cta */
  cta: { display: "flex", alignItems: "center", gap: "20px" },
  ctaLine: { flex: 1, height: "1px", background: "#e8e8e8" },
  ctaBtn: {
    padding: "12px 28px", borderRadius: "99px",
    border: "1.5px solid #111", background: "transparent",
    color: "#111", fontSize: "13px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em", whiteSpace: "nowrap",
    transition: "background 0.18s ease, color 0.18s ease",
  },
};