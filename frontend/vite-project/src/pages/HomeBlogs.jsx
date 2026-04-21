import { useEffect, useState } from "react";

// Poppins font Google se load karo — index.html mein bhi add kar sakte ho
// ya seedha yahan import karo
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

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
    image:    raw.image || null,
  };
}

const PALETTE = [
  { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400",   hex: "#3b9de8" },
  { bg: "bg-purple-50", text: "text-purple-700",  dot: "bg-purple-500", hex: "#8b5cf6" },
  { bg: "bg-emerald-50",text: "text-emerald-700", dot: "bg-emerald-500",hex: "#10b981" },
  { bg: "bg-amber-50",  text: "text-amber-700",   dot: "bg-amber-400",  hex: "#f59e0b" },
  { bg: "bg-pink-50",   text: "text-pink-700",    dot: "bg-pink-500",   hex: "#ec4899" },
];

const colorCache = {};
let colorIdx = 0;
function getColor(cat) {
  if (!colorCache[cat]) {
    colorCache[cat] = PALETTE[colorIdx % PALETTE.length];
    colorIdx++;
  }
  return colorCache[cat];
}

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
    <section className="max-w-[1100px] mx-auto px-6 py-20" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex justify-between items-end mb-12 gap-8 flex-wrap">
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2 font-mono">
            Writing & Thoughts
          </p>
          <h2 className="text-5xl font-bold leading-tight m-0 text-gray-900">
            From the{" "}
            <span className="italic text-purple-600">notebook</span>
          </h2>
        </div>
        <p className="text-base text-gray-500 max-w-[340px] leading-relaxed m-0">
          Essays on engineering, design, and the craft of building software that people love.
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      {!loading && blogs.length > 0 && (
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border border-gray-200
                ${active === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-transparent text-gray-500 hover:border-gray-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Loading Skeletons ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="border border-gray-100 rounded-2xl h-72 animate-pulse"
              style={{
                background: "linear-gradient(90deg,#f7f7f7 25%,#efefef 50%,#f7f7f7 75%)",
                backgroundSize: "200% 100%",
              }}
            />
          ))}
        </div>

      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-12 text-sm font-mono">
          {blogs.length === 0 ? "No blog posts found." : "No posts in this category yet."}
        </p>

      ) : (
        <>
          {/* ── Featured Card ── */}
          {featured && (
            <div
              className={`relative border rounded-2xl mb-6 cursor-pointer overflow-hidden bg-white transition-all duration-200
                ${hovered === "featured" ? "border-purple-400 -translate-y-0.5 shadow-lg" : "border-gray-200"}`}
              onMouseEnter={() => setHovered("featured")}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left accent bar */}
              <div
                className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl z-10 ${getColor(featured.category).dot}`}
              />

              <div className="flex items-stretch">
                {/* Featured Image */}
                {featured.image && (
                  <div className="flex-shrink-0 w-[280px] min-h-[220px] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Featured Content */}
                <div className="flex-1 p-9">
                  <span className={`inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4
                    ${getColor(featured.category).bg} ${getColor(featured.category).text}`}>
                    {featured.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400 font-mono">{featured.date}</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-xs text-gray-400 font-mono">{featured.readTime}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-gray-300 flex items-start pt-9 pr-7">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* ── Blog Cards Grid ── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {rest.map((blog) => {
                const colors    = getColor(blog.category);
                const isHovered = hovered === blog.id;
                return (
                  <div
                    key={blog.id}
                    className={`relative border rounded-2xl cursor-pointer overflow-hidden bg-white flex flex-col transition-all duration-200
                      ${isHovered ? "border-purple-400 -translate-y-0.5 shadow-lg" : "border-gray-200"}`}
                    onMouseEnter={() => setHovered(blog.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Card Image */}
                    {blog.image ? (
                      <div className="w-full h-44 overflow-hidden flex-shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover block transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className={`w-full h-36 flex-shrink-0 flex items-center justify-center ${colors.bg}`}>
                        <span className="text-3xl opacity-50">✍</span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1 relative">
                      {/* Dot indicator */}
                      <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${colors.dot}`} />

                      <span className={`inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3
                        ${colors.bg} ${colors.text}`}>
                        {blog.tag}
                      </span>

                      <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                        {blog.excerpt}
                      </p>

                      {/* Card Footer */}
                      <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-400 font-mono">{blog.date}</span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs text-gray-400 font-mono">{blog.readTime}</span>
                        </div>
                        <span className={`text-xs font-semibold font-mono tracking-wide ${colors.text}`}>
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Footer CTA ── */}
      <div className="flex items-center gap-5">
        <span className="flex-1 h-px bg-gray-200" />
        <button className="px-7 py-3 rounded-full border border-gray-900 bg-transparent text-gray-900 text-xs font-semibold tracking-widest whitespace-nowrap transition-all duration-200 hover:bg-gray-900 hover:text-white font-mono">
          View all posts
        </button>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

    </section>
  );
}