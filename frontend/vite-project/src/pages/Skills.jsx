export default function Skills() {
  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "HTML & CSS", "Tailwind CSS", "Redux"] },
    { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"] },
    { category: "Database", items: ["MongoDB", "Mongoose", "SQL Basics"] },
    { category: "Tools", items: ["Git & GitHub", "Vite", "Postman", "VS Code"] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .skills-page {
          font-family: 'Poppins', sans-serif;
          background: #080810;
          min-height: 100vh;
          padding: 5rem 1.5rem 4rem;
        }

        .skills-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .skills-badge {
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

        .skills-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }

        .skills-title span {
          background: linear-gradient(90deg, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .skills-subtitle {
          color: #6b6b85;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .skills-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .skills-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.5rem;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }

        .skills-card:hover {
          border-color: rgba(139,92,246,0.3);
          box-shadow: 0 10px 30px rgba(139,92,246,0.1);
          transform: translateY(-4px);
        }

        .skills-cat {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8b5cf6;
          margin-bottom: 1rem;
        }

        .skills-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skills-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: #b0b0c8;
        }

        .skills-item::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          flex-shrink: 0;
        }
      `}</style>

      <div className="skills-page">
        <div className="skills-hero">
          <div className="skills-badge">Tech Stack</div>
          <h1 className="skills-title">
            My <span>Skills</span>
          </h1>
          <p className="skills-subtitle">
            Technologies and tools I work with to build modern web applications.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.category} className="skills-card">
              <p className="skills-cat">{s.category}</p>
              <div className="skills-items">
                {s.items.map((item) => (
                  <div key={item} className="skills-item">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
