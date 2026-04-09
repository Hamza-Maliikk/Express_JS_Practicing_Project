export default function Projects() {
  const projects = [
    {
      title: "Express API",
      desc: "A full-stack REST API with authentication, role-based access and CRUD operations.",
      tags: ["Node.js", "Express", "MongoDB"],
      color: "#8b5cf6",
    },
    {
      title: "Portfolio Website",
      desc: "Personal portfolio built with React and Vite showcasing skills, blogs and education.",
      tags: ["React", "Vite", "CSS"],
      color: "#6366f1",
    },
    {
      title: "Blog Platform",
      desc: "A content management system with categories, rich text editor and user auth.",
      tags: ["React", "Redux", "Node.js"],
      color: "#a78bfa",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .proj-page {
          font-family: 'Poppins', sans-serif;
          background: #080810;
          min-height: 100vh;
          padding: 5rem 1.5rem 4rem;
        }

        .proj-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .proj-badge {
          display: inline-block;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #c4b5fd;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .proj-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }

        .proj-title span {
          background: linear-gradient(90deg, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .proj-subtitle {
          color: #6b6b85;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .proj-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .proj-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }

        .proj-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--card-color);
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .proj-card:hover {
          transform: translateY(-6px);
          border-color: rgba(139,92,246,0.25);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .proj-card:hover::before { opacity: 1; }

        .proj-card-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #f3f4f6;
          margin: 0 0 0.75rem;
        }

        .proj-card-desc {
          font-size: 0.85rem;
          color: #6b6b85;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .proj-tag {
          font-size: 0.72rem;
          font-weight: 500;
          padding: 0.25rem 0.7rem;
          border-radius: 6px;
          background: rgba(139,92,246,0.1);
          color: #a78bfa;
          border: 1px solid rgba(139,92,246,0.2);
        }
      `}</style>

      <div className="proj-page">
        <div className="proj-hero">
          <div className="proj-badge">My Work</div>
          <h1 className="proj-title">
            Featured <span>Projects</span>
          </h1>
          <p className="proj-subtitle">
            A collection of things I've built — from APIs to full-stack web apps.
          </p>
        </div>

        <div className="proj-grid">
          {projects.map((p) => (
            <div
              key={p.title}
              className="proj-card"
              style={{ "--card-color": p.color }}
            >
              <h2 className="proj-card-title">{p.title}</h2>
              <p className="proj-card-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
