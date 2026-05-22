import { useState, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";

const API_BASE = "http://localhost:8000/api/about";

const getAbout = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};



const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    getAbout()
      .then(setAboutData)
      .catch(() => setApiError(true))   
      .finally(() => setLoading(false));
  }, []);

  // Demo fallback
  const data = aboutData || (apiError ? {
    intro: "Welcome! I'm a passionate developer focused on building modern, human-centric web applications. I believe digital tools should empower people — not overwhelm them.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS", "Next.js", "PostgreSQL", "Docker"],
  } : null);

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#050508",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 14,
    }}>
      <div style={{
        width: 34, height: 34,
        border: "3px solid rgba(99,102,241,0.2)",
        borderTop: "3px solid #6366f1",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: "0.12em" }}>LOADING</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .fu { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.35s; }
        .d4 { animation-delay: 0.5s; }
        .d5 { animation-delay: 0.65s; }

        .gradient-text {
          background: linear-gradient(90deg, #fff 0%, #a5b4fc 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 99px;
          border: 1px solid rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.07);
          color: #a5b4fc;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .section-tag::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 6px #6366f1;
        }

        .section-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }
        .section-rule::before {
          content: '';
          width: 28px; height: 1px;
          background: rgba(99,102,241,0.5);
          flex-shrink: 0;
        }
        .rule-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #818cf8;
        }

        .card {
          background: #0d0d18;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.3s;
        }
        .card:hover { border-color: rgba(99,102,241,0.25); }

        .value-card {
          background: #0d0d18;
          border-radius: 16px;
          padding: 24px;
          transition: transform 0.3s, border-color 0.3s;
          cursor: default;
        }
        .value-card:hover { transform: translateY(-5px); }

        .skill-pill {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 99px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          color: #a5b4fc;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }
        .skill-pill:hover {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.4);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent);
          margin: 0;
        }

        @media(max-width: 640px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 36px !important; }
          .page-pad { padding: 60px 20px !important; }
        }
      `}</style>

      {/* ── Background glows ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse at 20% 10%, rgba(99,102,241,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 50%)
        `,
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 48px 80px", position: "relative", zIndex: 1 }}
        className="page-pad">

        {/* API error banner */}
        {apiError && (
          <div style={{
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: 10,
            padding: "10px 18px",
            color: "#fb7185",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 28,
          }}>
            ⚠ API not reachable — showing demo data. Make sure your backend is running on port 8000.
          </div>
        )}

        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="fu d1" style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-tag" style={{ margin: "0 auto 18px" }}>About Me</div>

          

       
        </div>

        {/* ── Who I Am ──────────────────────────────────────── */}
        <section className="fu d2" style={{ marginBottom: 52 }}>
          <div className="section-rule">
            <span className="rule-label">Who I Am</span>
          </div>
          <div className="card">
            <p style={{
              fontSize: 14.5,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.6)",
            }}>
              {data?.intro ||
                "Welcome! I'm a passionate developer focused on building modern, human-centric web applications. I believe digital tools should empower people — not overwhelm them. Every project I take on is a chance to merge great design with reliable engineering."}
            </p>
          </div>
        </section>

        <div className="divider" style={{ marginBottom: 52 }} />

     

        <div className="divider" style={{ marginBottom: 52 }} />

        {/* ── Tech Stack ────────────────────────────────────── */}
        {data?.skills?.length > 0 && (
          <section className="fu d3" style={{ marginBottom: 52 }}>
            <div className="section-rule">
              <span className="rule-label">Tech Stack</span>
            </div>
            <div className="card">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {data.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="divider" style={{ marginBottom: 52 }} />



        <div className="divider" style={{ marginBottom: 52 }} />

        {/* ── CTA ───────────────────────────────────────────── */}
        <div className="fu d5" style={{ textAlign: "center" }}>
          <p style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 22,
            letterSpacing: "0.03em",
          }}>
            Want to learn more or work together?
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "12px 28px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.35)";
            }}
          >
            <Mail size={15} />
            Get In Touch
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;