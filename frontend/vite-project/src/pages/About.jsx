import { useState, useEffect } from "react";

// Poppins font inject
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const API_BASE = "http://localhost:8000/api/about";

const getAbout = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const values = [
  {
    icon: "💡",
    title: "Innovation",
    desc: "We don't just follow trends — we stay curious and aim to set them.",
    color: "from-violet-500/10 to-indigo-500/10",
    border: "border-violet-400/20",
    label: "text-violet-400",
  },
  {
    icon: "🤝",
    title: "Integrity",
    desc: "Transparency is our default setting. We value your trust above all else.",
    color: "from-sky-500/10 to-cyan-500/10",
    border: "border-sky-400/20",
    label: "text-sky-400",
  },
  {
    icon: "🌱",
    title: "Community",
    desc: "Built for users, by users. Your feedback is the engine that drives us.",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-400/20",
    label: "text-emerald-400",
  },
];

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    getAbout()
      .then(setAboutData)
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-20 transition-colors duration-300"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ── */}
        <div className="text-center mb-20">
          <span className="inline-block bg-violet-500/10 border border-violet-400/30 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            About Me
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-h)] mb-5">
            The{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Story
            </span>{" "}
            So Far
          </h1>

          <p className="text-base italic text-[var(--text)] opacity-70 max-w-xl mx-auto leading-relaxed">
            {aboutData?.intro || '"Building the future, one line of code at a time."'}
          </p>
        </div>

        {/* ── Who I Am ── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-violet-400/40" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-violet-400">
              Who I Am
            </h2>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
            <p className="text-base leading-relaxed text-[var(--text)] opacity-85">
              {aboutData?.intro ||
                "Welcome! I'm a passionate developer focused on building modern, human-centric web applications. I believe digital tools should empower people — not overwhelm them. Every project I take on is a chance to merge great design with reliable engineering."}
            </p>
          </div>
        </section>

        {/* ── Values Grid ── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-violet-400/40" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-violet-400">
              Core Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className={`bg-gradient-to-br ${v.color} border ${v.border} rounded-2xl p-6
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className={`font-semibold text-base mb-2 ${v.label}`}>{v.title}</h3>
                <p className="text-sm text-[var(--text)] opacity-75 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        {aboutData?.skills?.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-violet-400/40" />
              <h2 className="text-xs font-semibold tracking-widest uppercase text-violet-400">
                Tech Stack
              </h2>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
              <div className="flex flex-wrap gap-2.5">
                {aboutData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-violet-500/10 border border-violet-400/20 text-violet-300
                      text-xs font-medium px-4 py-1.5 rounded-full tracking-wide
                      hover:bg-violet-500/20 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Philosophy ── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-violet-400/40" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-violet-400">
              My Philosophy
            </h2>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
            <p className="text-base text-[var(--text)] opacity-80 leading-relaxed mb-6">
              I treat every project like an equation where the solution must be both elegant and efficient.
              My approach to building software follows one simple formula:
            </p>
            <div className="bg-violet-500/5 border border-violet-400/20 rounded-xl py-5 px-6 text-center">
              <code className="text-violet-300 text-base sm:text-lg font-mono">
                Success = (UX + Reliability) × Creativity
              </code>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="text-center">
          <p className="text-sm text-[var(--text)] opacity-60 mb-5">
            Want to learn more or work together?
          </p>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm
              py-3 px-8 rounded-full transition-all duration-300
              shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
          >
            Get In Touch
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;