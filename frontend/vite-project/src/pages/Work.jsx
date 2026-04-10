import { useEffect, useState } from "react";

const API = "http://localhost:8000";

const SAMPLE_PROJECTS = [
  {
    _id: "1",
    title: "Portfolio Website",
    description: "A personal portfolio built with React and Node.js showcasing projects and skills.",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com",
  },
  {
    _id: "2",
    title: "E-Commerce App",
    description: "Full-stack e-commerce platform with JWT auth, cart management and payment integration.",
    technologies: ["React", "Express.js", "MongoDB", "Redux"],
    link: "https://github.com",
  },
  {
    _id: "3",
    title: "REST API Service",
    description: "Scalable REST API with authentication, rate limiting and full CRUD operations.",
    technologies: ["Node.js", "Express.js", "JWT", "MongoDB"],
    link: "https://github.com",
  },
];

export default function Work() {
  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm]             = useState({ title: "", description: "", technologies: "", link: "" });
  const [saving, setSaving]         = useState(false);

  const canCrud = Boolean(localStorage.getItem("token"));

  // ── GET ──
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res  = await fetch(`${API}/api/projects`);
        const data = await res.json();
        setProjects(data && data.length ? data : SAMPLE_PROJECTS);
      } catch {
        setProjects(SAMPLE_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openAdd = () => {
    setEditProject(null);
    setForm({ title: "", description: "", technologies: "", link: "" });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProject(p);
    setForm({
      title: p.title,
      description: p.description,
      technologies: p.technologies.join(", "),
      link: p.link,
    });
    setShowForm(true);
  };

  // ── POST / PUT ──
  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link.trim(),
    };

    try {
      const url    = editProject ? `${API}/api/projects/${editProject._id}` : `${API}/api/projects`;
      const method = editProject ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (editProject) {
        setProjects((prev) => prev.map((p) => (p._id === editProject._id ? data.data : p)));
      } else {
        setProjects((prev) => [...prev, data.data]);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await fetch(`${API}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .work-page {
          font-family: 'DM Sans', sans-serif;
          background: #06060a;
          min-height: 100vh;
          padding: 5rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
        }

        .work-page::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,57,242,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .work-page::after {
          content: '';
          position: fixed;
          bottom: -200px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .work-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .work-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .work-heading-group {}

        .work-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6339f2;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .work-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: #6339f2;
        }

        .work-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          color: #f0f0f0;
          margin: 0;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .work-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(99,57,242,0.6);
        }

        .work-count {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          color: #444;
          margin-top: 0.8rem;
          letter-spacing: 0.05em;
        }

        .work-add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #6339f2;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.7rem 1.4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }

        .work-add-btn:hover {
          background: #7c56f5;
          transform: translateY(-2px);
        }

        /* ── Grid ── */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem;
        }

        .work-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }

        .work-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,57,242,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .work-card:hover {
          border-color: rgba(99,57,242,0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,57,242,0.1);
        }

        .work-card:hover::before { opacity: 1; }

        .work-card-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(99,57,242,0.4);
          letter-spacing: 0.15em;
        }

        .work-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #f0f0f0;
          margin: 0;
          line-height: 1.3;
        }

        .work-card-desc {
          font-size: 0.875rem;
          color: #888;
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }

        .work-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .work-tech {
          font-size: 0.72rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          background: rgba(99,57,242,0.1);
          border: 1px solid rgba(99,57,242,0.2);
          color: #a78bfa;
          letter-spacing: 0.03em;
        }

        .work-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .work-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: #6339f2;
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }

        .work-link:hover { color: #a78bfa; gap: 0.6rem; }

        .work-actions {
          display: flex;
          gap: 0.4rem;
        }

        .work-action-btn {
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: #666;
          border-radius: 7px;
          padding: 0.3rem 0.6rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .work-action-btn:hover { border-color: #6339f2; color: #a78bfa; }
        .work-action-btn.del:hover { border-color: #ef4444; color: #ef4444; }

        /* ── Loading ── */
        .work-loading {
          text-align: center;
          padding: 6rem 0;
          color: #444;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
        }

        /* ── Empty ── */
        .work-empty {
          grid-column: 1/-1;
          text-align: center;
          padding: 5rem 0;
          color: #444;
        }

        .work-empty p { margin: 0.5rem 0 0; font-size: 0.875rem; }

        /* ── Modal ── */
        .work-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .work-modal {
          background: #0f0f16;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 2rem;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .work-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #f0f0f0;
          margin: 0;
        }

        .work-field { display: flex; flex-direction: column; gap: 0.4rem; }

        .work-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .work-input, .work-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .work-input:focus, .work-textarea:focus {
          border-color: rgba(99,57,242,0.5);
        }

        .work-textarea { resize: vertical; min-height: 90px; }

        .work-hint {
          font-size: 0.7rem;
          color: #444;
          margin-top: 0.2rem;
        }

        .work-modal-btns {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding-top: 0.5rem;
        }

        .work-cancel-btn {
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #888;
          border-radius: 10px;
          padding: 0.7rem 1.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .work-save-btn {
          background: #6339f2;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.7rem 1.4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .work-save-btn:hover { background: #7c56f5; }
        .work-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 600px) {
          .work-grid { grid-template-columns: 1fr; }
          .work-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="work-page">
        <div className="work-inner">

          {/* ── Header ── */}
          <div className="work-header">
            <div className="work-heading-group">
              <div className="work-eyebrow">Selected Work</div>
              <h1 className="work-title">
                My <em>Projects</em>
              </h1>
              {!loading && (
                <p className="work-count">{projects.length} projects</p>
              )}
            </div>
            {canCrud && (
              <button className="work-add-btn" onClick={openAdd}>
                + Add Project
              </button>
            )}
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div className="work-loading">Loading projects...</div>
          ) : (
            <div className="work-grid">
              {projects.length === 0 ? (
                <div className="work-empty">
                  <p>No projects yet.</p>
                  {canCrud && <p>Click "Add Project" to get started.</p>}
                </div>
              ) : (
                projects.map((p, idx) => (
                  <div key={p._id} className="work-card">
                    <span className="work-card-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="work-card-title">{p.title}</h2>
                    <p className="work-card-desc">{p.description}</p>

                    {p.technologies?.length > 0 && (
                      <div className="work-techs">
                        {p.technologies.map((t) => (
                          <span key={t} className="work-tech">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="work-card-footer">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-link"
                        >
                          View Project →
                        </a>
                      ) : (
                        <span />
                      )}

                      {canCrud && (
                        <div className="work-actions">
                          <button
                            className="work-action-btn"
                            onClick={() => openEdit(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="work-action-btn del"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {showForm && (
        <div className="work-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="work-modal">
            <h2 className="work-modal-title">
              {editProject ? "Edit Project" : "Add Project"}
            </h2>

            <div className="work-field">
              <label className="work-label">Title</label>
              <input
                className="work-input"
                placeholder="Project name"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            <div className="work-field">
              <label className="work-label">Description</label>
              <textarea
                className="work-textarea"
                placeholder="What did you build?"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="work-field">
              <label className="work-label">Technologies</label>
              <input
                className="work-input"
                placeholder="React, Node.js, MongoDB"
                value={form.technologies}
                onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
              />
              <span className="work-hint">Comma se alag karo</span>
            </div>

            <div className="work-field">
              <label className="work-label">Link</label>
              <input
                className="work-input"
                placeholder="https://github.com/..."
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              />
            </div>

            <div className="work-modal-btns">
              <button className="work-cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button
                className="work-save-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : editProject ? "Update" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}