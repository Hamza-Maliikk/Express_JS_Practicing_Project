import { useMemo, useState, useEffect } from "react";

const API = "http://localhost:8000";

const DEFAULT_ABOUT = "I am a full-stack web developer focused on building clean, reliable, and user-friendly applications.";
const DEFAULT_SKILLS = ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "REST APIs", "Git/GitHub"];

export default function Portfolio() {
  const canCrud = Boolean(localStorage.getItem("token"));
  const displayName = useMemo(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return "Developer";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  const [aboutId, setAboutId]           = useState(null);
  const [about, setAbout]               = useState(DEFAULT_ABOUT);
  const [aboutDraft, setAboutDraft]     = useState("");
  const [editingAbout, setEditingAbout] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [skills, setSkills]             = useState(DEFAULT_SKILLS);
  const [newSkill, setNewSkill]         = useState("");

  // ── GET ──
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res  = await fetch(`${API}/api/about`);
        const data = await res.json();
        console.log("About data:", data);
        if (data && data.intro) {
          setAbout(data.intro);
          setAboutDraft(data.intro);
          setAboutId(data._id);
        }
      } catch (err) {
        console.error("About fetch error:", err);
      }
    };
    fetchAbout();
  }, []);

  // ── POST ya PUT ──
  const saveAbout = async () => {
    const next = aboutDraft.trim();
    if (!next) return;
    setLoading(true);

    try {
      let res;

      if (aboutId) {
        // record exist karta hai → PUT
        res = await fetch(`${API}/api/about/${aboutId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ intro: next }),
        });
      }

      const data = await res.json();
      console.log("Save response:", data);

      setAbout(data.data.intro);
      setAboutId(data.data._id); // id save karo future requests ke liye
      setEditingAbout(false);

    } catch (err) {
      console.error("About save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value) return;
    setSkills([...skills, value]);
    setNewSkill("");
  };

  const removeSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  return (
    <>
      <style>{`
        .portfolio-page { max-width: 950px; margin: 0 auto; color: #ececec; font-family: 'Poppins', sans-serif; }
        .portfolio-title { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 500; margin: 0 0 0.4rem; letter-spacing: -0.02em; }
        .portfolio-sub { color: #a3a3a3; margin-bottom: 1.2rem; font-size: 0.9rem; }
        .portfolio-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1rem; }
        .portfolio-card { background: #181818; border: 1px solid #2f2f2f; border-radius: 12px; padding: 1rem 1.1rem; }
        .portfolio-card h3 { margin: 0 0 0.7rem; font-family: 'Fraunces', serif; font-weight: 500; }
        .portfolio-card p { margin: 0; color: #cccccc; line-height: 1.8; font-size: 0.92rem; }
        .skills-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-chip { padding: 0.35rem 0.7rem; border-radius: 999px; border: 1px solid #3a3a3a; background: #252525; color: #e6e6e6; font-size: 0.8rem; display:flex; align-items:center; gap:.4rem; }
        .btn { border: 1px solid #444; background: #262626; color: #eee; border-radius: 8px; padding: 6px 10px; cursor: pointer; font-size: 12px; }
        .input { width: 100%; border: 1px solid #3a3a3a; border-radius: 8px; background:#1f1f1f; color:#eee; padding: 10px; box-sizing: border-box; }
        .inline { display:flex; gap:8px; margin-top:10px; flex-wrap: wrap; }
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="portfolio-page">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-sub">About me and my core skills</p>
        <div className="portfolio-grid">

          <article className="portfolio-card">
            <h3>About Me</h3>
            {canCrud && editingAbout ? (
              <>
                <textarea
                  className="input"
                  rows={6}
                  value={aboutDraft}
                  onChange={(e) => setAboutDraft(e.target.value)}
                />
                <div className="inline">
                  <button className="btn" onClick={saveAbout} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button className="btn" onClick={() => { setEditingAbout(false); setAboutDraft(about); }}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Hi, I am {displayName}. {about}</p>
                {canCrud && (
                  <div className="inline">
                    <button className="btn" onClick={() => { setEditingAbout(true); setAboutDraft(about); }}>
                      Edit Intro
                    </button>
                  </div>
                )}
              </>
            )}
          </article>

          <article className="portfolio-card">
            <h3>My Skills</h3>
            <div className="skills-wrap">
              {skills.map((skill, idx) => (
                <span className="skill-chip" key={`${skill}-${idx}`}>
                  {skill}
                  {canCrud && (
                    <button className="btn" onClick={() => removeSkill(idx)}>x</button>
                  )}
                </span>
              ))}
            </div>
            {canCrud && (
              <div className="inline">
                <input
                  className="input"
                  placeholder="Add skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button className="btn" onClick={addSkill}>Add Skill</button>
              </div>
            )}
          </article>

        </div>
      </section>
    </>
  );
}