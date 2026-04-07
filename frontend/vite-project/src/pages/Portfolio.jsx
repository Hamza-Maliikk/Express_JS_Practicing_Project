import { useMemo } from "react";

const skills = [
  "React",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Redux Toolkit",
  "REST APIs",
  "Git/GitHub",
];

export default function Portfolio() {
  const displayName = useMemo(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return "Developer";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&family=Poppins:wght@400;500;600&display=swap');

        .portfolio-page {
          max-width: 950px;
          margin: 0 auto;
          color: #ececec;
          font-family: 'Poppins', sans-serif;
        }

        .portfolio-title {
          font-family: 'Fraunces', serif;
          font-size: 2rem;
          font-weight: 500;
          margin: 0 0 0.4rem;
          letter-spacing: -0.02em;
        }

        .portfolio-sub {
          color: #a3a3a3;
          margin-bottom: 1.2rem;
          font-size: 0.9rem;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1rem;
        }

        .portfolio-card {
          background: #181818;
          border: 1px solid #2f2f2f;
          border-radius: 12px;
          padding: 1rem 1.1rem;
        }

        .portfolio-card h3 {
          margin: 0 0 0.7rem;
          font-family: 'Fraunces', serif;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .portfolio-card p {
          margin: 0;
          color: #cccccc;
          line-height: 1.8;
          font-size: 0.92rem;
        }

        .skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-chip {
          padding: 0.35rem 0.7rem;
          border-radius: 999px;
          border: 1px solid #3a3a3a;
          background: #252525;
          color: #e6e6e6;
          font-size: 0.8rem;
        }

        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="portfolio-page">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-sub">About me and my core skills</p>

        <div className="portfolio-grid">
          <article className="portfolio-card">
            <h3>About Me</h3>
            <p>
              Hi, I am {displayName}. I am a full-stack web developer focused on
              building clean, reliable, and user-friendly applications. I enjoy
              solving practical problems, designing good APIs, and creating
              interfaces that are simple and smooth to use.
            </p>
          </article>

          <article className="portfolio-card">
            <h3>My Skills</h3>
            <div className="skills-wrap">
              {skills.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
