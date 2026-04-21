import { useEffect, useState } from "react";

// Poppins font inject
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const API = "http://localhost:8000";

const PALETTE = [
  { dot: "from-violet-500 to-indigo-500", border: "hover:border-violet-300", label: "text-violet-500" },
  { dot: "from-pink-500 to-rose-400",     border: "hover:border-pink-300",   label: "text-pink-500"   },
  { dot: "from-emerald-500 to-teal-400",  border: "hover:border-emerald-300",label: "text-emerald-500"},
  { dot: "from-amber-500 to-yellow-400",  border: "hover:border-amber-300",  label: "text-amber-500"  },
  { dot: "from-sky-500 to-cyan-400",      border: "hover:border-sky-300",    label: "text-sky-500"    },
];

export default function Skills() {
  const [skills,  setSkills]  = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API}/api/about`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data?.skills?.length > 0) {
          setSkills([{ category: "Skills", items: data.skills }]);
        }
      } catch (error) {
        console.error("Skills fetch error:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div
      className="min-h-screen px-6 py-20 bg-[var(--bg)] transition-colors duration-300"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ── Hero ── */}
      <div className="text-center mb-16">
        {/* Badge */}
        <span className="inline-block bg-violet-500/10 border border-violet-400/30 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
          Tech Stack
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-h)] mb-4 m-0">
          My{" "}
          <span
            className="font-bold"
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Skills
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[var(--text)] text-base max-w-md mx-auto leading-relaxed opacity-75">
          Technologies and tools I work with to build modern web applications.
        </p>
      </div>

      {/* ── Skills Grid ── */}
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {skills.map((s, si) => {
          const palette   = PALETTE[si % PALETTE.length];
          const isHovered = hovered === s.category;
          return (
            <div
              key={s.category}
              onMouseEnter={() => setHovered(s.category)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow)]
                transition-all duration-300 cursor-default
                ${palette.border}
                ${isHovered ? "-translate-y-1 shadow-violet-200/40 shadow-xl" : ""}`}
            >
              {/* Category label */}
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${palette.label}`}>
                {s.category}
              </p>

              {/* Skill items */}
              <div className="flex flex-col gap-2.5">
                {s.items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-[var(--text)]">
                    {/* Dot */}
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br ${palette.dot}`} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}