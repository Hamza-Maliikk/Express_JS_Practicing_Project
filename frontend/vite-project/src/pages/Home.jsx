import { useState } from "react";
import Profile from "../assets/hamza picture blue background.jpeg";


const NAV_LINKS = ["Home", "About", "Project", "Skills"];
const PROJECTS = [
  {
    id: 1,
    title: "Lumina Concept Store",
    sub: "Brand Identity & Digital Experience",
    col1: true,
    tall: false,
    bg: "linear-gradient(135deg,#1c1c1c 0%,#2e2e2e 100%)",
    shape: "rect",
  },
  {
    id: 2,
    title: "Aura Smart Wearable",
    sub: "Product Design & Interface Strategy",
    col1: false,
    tall: true,
    bg: "linear-gradient(135deg,#0d1b2a 0%,#1a3a5c 100%)",
    shape: "device",
  },
  {
    id: 3,
    title: "Synthesis Journal",
    sub: "Editorial Design & Content Strategy",
    col1: true,
    tall: true,
    bg: "linear-gradient(135deg,#e8e4dc 0%,#d4cfc4 100%)",
    dark: true,
    shape: "paper",
  },
  {
    id: 4,
    title: "Kinetic Motion Lab",
    sub: "Web & Immersive Art Direction",
    col1: false,
    tall: false,
    bg: "linear-gradient(135deg,#050d1a 0%,#0a1f3d 100%)",
    shape: "wave",
  },
];

const SKILLS = [
  {
    icon: "◈",
    title: "Design Systems",
    desc: "Scaling brands through modular architecture and robust component libraries that ensure consistency across platforms.",
    color: "#2563eb",
  },
  {
    icon: "↗",
    title: "Market Research",
    desc: "Deep diving into user behavior and market trends to build products that resonate and solve real world problems.",
    color: "#2563eb",
  },
  {
    icon: "◎",
    title: "Prototyping",
    desc: "Rapidly bringing ideas to life with high-fidelity interactive prototypes that bridge the gap between design and development.",
    color: "#2563eb",
  },
  {
    icon: "✦",
    title: "Art Direction",
    desc: "Curating visual narratives that communicate the soul of a brand through intentional typography and imagery.",
    color: "#2563eb",
  },
];

const EXPERTISE_LIST = [
  "User Experience Design",
  "Brand Identity & Strategy",
  "Interactive Art Direction",
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: project.bg,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.4s cubic-bezier(.25,.46,.45,.94)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Visual placeholder matching each project */}
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        {project.shape === "rect" && (
          <div
            style={{
              width: "70%",
              height: 90,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        )}
        {project.shape === "device" && (
          <div
            style={{
              width: 120,
              height: 80,
              background: "rgba(30,80,140,0.5)",
              borderRadius: 8,
              border: "2px solid rgba(100,180,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 4,
                background: "rgba(100,180,255,0.5)",
                borderRadius: 2,
              }}
            />
          </div>
        )}
        {project.shape === "paper" && (
          <div
            style={{
              width: "60%",
              height: 100,
              background: "rgba(255,255,255,0.85)",
              borderRadius: 1,
              boxShadow: "4px 4px 12px rgba(0,0,0,0.12)",
            }}
          />
        )}
        {project.shape === "wave" && (
          <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
            <path
              d="M0 35 Q20 10 40 35 Q60 60 80 35 Q100 10 120 35"
              stroke="rgba(0,180,255,0.4)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 45 Q20 20 40 45 Q60 70 80 45 Q100 20 120 45"
              stroke="rgba(0,180,255,0.25)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Label */}
      <div style={{ padding: "0 0 20px 20px" }}>
        <div
          style={{
            width: 28,
            height: 2,
            background: "#fff",
            marginBottom: 10,
            opacity: project.dark ? 0 : 1,
          }}
        />
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17,
            fontWeight: 700,
            color: project.dark ? "#111" : "#fff",
            margin: "0 0 4px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: project.dark ? "#666" : "rgba(255,255,255,0.55)",
            margin: 0,
          }}
        >
          {project.sub}
        </p>
      </div>
    </div>
  );
}

export default function KineticPortfolio() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: "",
  });


  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "var(--bg)",
        color: "var(--text)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); }

        .nav-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #555;
          cursor: pointer;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1.5px solid transparent;
          transition: color .2s, border-color .2s;
          letter-spacing: .01em;
        }
        .nav-item:hover, .nav-item.active { color: var(--text-h); border-bottom-color: var(--text-h); }

        .btn-primary {
          background: #1d4ed8;
          color: #fff;
          border: none;
          padding: 11px 22px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: .01em;
          transition: background .2s, transform .2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-primary:hover { background: #1e40af; transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          color: var(--text-h);
          border: 1px solid var(--border);
          padding: 10px 20px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-outline:hover { border-color: #555; background: #f8f8f6; }

        .skill-card {
          background: var(--card-bg);
          border: .5px solid var(--border);
          border-radius: 4px;
          padding: 24px 20px;
          transition: box-shadow .3s, transform .3s;
        }
        .skill-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,.08); transform: translateY(-3px); }

        .form-field {
          width: 100%;
          padding: 10px 13px;
          border: .5px solid #d8d4cd;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-h);
          background: var(--card-bg);
          outline: none;
          transition: border-color .2s;
        }
        .form-field:focus { border-color: #1d4ed8; }

        .label-sm {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: .09em;
          text-transform: uppercase;
          color: #999;
          display: block;
          margin-bottom: 6px;
        }

        @keyframes fadeUp {
          from { opacity:0; transform: translateY(28px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .fu { animation: fadeUp .75s ease forwards; }
        .fu1 { animation-delay:.05s; opacity:0; }
        .fu2 { animation-delay:.18s; opacity:0; }
        .fu3 { animation-delay:.32s; opacity:0; }
        .fu4 { animation-delay:.46s; opacity:0; }
        .fu5 { animation-delay:.60s; opacity:0; }

        @media(max-width:768px){
          .hero-inner { flex-direction: column !important; }
          .hero-photo { width:100% !important; height:260px !important; margin-top:32px; }
          .works-grid  { grid-template-columns:1fr !important; }
          .exp-inner   { flex-direction:column !important; gap:40px !important; }
          .skills-grid { grid-template-columns:1fr !important; }
          .contact-inner { flex-direction:column !important; gap:48px !important; }
          .hero-h1 { font-size:44px !important; }
          .mob-hide { display:none !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Navbar is rendered by HomeLayout */}

      {/* ── HERO ── */}
      <section
        style={{ maxWidth: 1160, margin: "0 auto", padding: "112px 48px 80px" }}
      >
        {/* label */}
        <p
          className="fu fu1"
          style={{
            display: "inline-block",
            padding: "6px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#fff",
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            borderRadius: "999px",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
            marginBottom: "20px",
            transition: "all 0.3s ease",
            cursor: "default",
          }}
        >
          Full Stack Developer
        </p>

        <div
          className="hero-inner"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 48,
          }}
        >
          {/* left */}
          <div style={{ flex: 1 }}>
            <h1
              className="hero-h1 fu fu2"
              style={{
                fontFamily: "'Poppins', serif",
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-.025em",
                color: "var(--text-h)",
                marginBottom: 24,
              }}
            >
              I build full-stack apps that work
              <br />
              end-to-end —
              <br />
              not just the parts that look good in a demo.
            </h1>
            <p
              className="fu fu3"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                color: "var(--text)",
                lineHeight: 1.75,
                maxWidth: 370,
                marginBottom: 36,
              }}
            >
              From pixel-perfect interfaces to rock-solid APIs and databases — I
              engineer complete digital products that are fast, scalable, and
              actually enjoyable to use
            </p>
            <div className="flex gap-5">
              <button className="btn-outline fu fu4">
                ↓ &nbsp;Download Resume
              </button>
              <button className="btn-outline fu fu4">
                ↓ &nbsp;Get in touch
              </button>
            </div>
          </div>

          {/* right – photo */}
          <div
            className="hero-photo fu fu3"
            style={{
              width: 300,
              height: 380,
              borderRadius: 3,
              overflow: "hidden",
              flexShrink: 0,
              background:
                "linear-gradient(160deg,#1c1c1c 0%,#383838 60%,#222 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Profile}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Profile"
            />
          </div>
        </div>
      </section>

      {/* ── SELECTED WORKS ── */}
      <section
        style={{ maxWidth: 1160, margin: "0 auto", padding: "0 48px 96px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                color: "var(--text-h)",
                marginBottom: 8,
              }}
            >
              Selected Works
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "var(--text)",
              }}
            >
              A curated collection of projects where strategy meets aesthetic
              excellence.
            </p>
          </div>
          <span
            className="mob-hide"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "#bbb",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Scroll to discover →
          </span>
        </div>

        {/* Masonry-style 2-col grid */}
        <div
          className="works-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Project 1 – shorter */}
            <div style={{ height: 240 }}>
              <ProjectCard project={PROJECTS[0]} />
            </div>
            {/* Project 3 – taller */}
            <div style={{ height: 280 }}>
              <ProjectCard project={PROJECTS[2]} />
            </div>
          </div>
          {/* Col 2 – offset down */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 48,
            }}
          >
            {/* Project 2 */}
            <div style={{ height: 300 }}>
              <ProjectCard project={PROJECTS[1]} />
            </div>
            {/* Project 4 */}
            <div style={{ height: 220 }}>
              <ProjectCard project={PROJECTS[3]} />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section style={{ background: "var(--card-bg)", padding: "88px 48px" }}>
        <div
          className="exp-inner"
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "flex",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
          {/* left */}
          <div style={{ flex: "0 0 300px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--text-h)",
                marginBottom: 20,
              }}
            >
              Crafting Digital
              <br />
              Excellence
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "var(--text)",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              My approach blends technical precision with artistic intuition.
              Every pixel is a choice, every interaction an opportunity to
              delight.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {EXPERTISE_LIST.map((item, i) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#1d4ed8",
                      letterSpacing: ".06em",
                      background: "#dbeafe",
                      borderRadius: 3,
                      padding: "3px 9px",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: "var(--text)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* right – 2×2 skills */}
          <div
            className="skills-grid"
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {SKILLS.map((s) => (
              <div key={s.title} className="skill-card">
                <div style={{ fontSize: 18, color: s.color, marginBottom: 12 }}>
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-h)",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text)",
                    lineHeight: 1.72,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section
        style={{
          background: "#0f0f0f",
          padding: "96px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 52,
              color: "#1d4ed8",
              lineHeight: 1,
              marginBottom: 36,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            "
          </div>
          <blockquote
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontStyle: "italic",
              color: "#f0ede8",
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            "Working with Kinetic Gallery transformed our brand into a digital
            benchmark. Their obsession with detail and editorial layout is
            unmatched in the industry."
          </blockquote>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#666",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Elena Moretti
          </p>
        </div>
      </section>

   

      {/* Footer is rendered by HomeLayout */}
    </div>
  );
}
