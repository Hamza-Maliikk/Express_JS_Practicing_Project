import { useState, useEffect } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

const CONTACT_API = "http://localhost:8000/api/contact";
const DETAILS_API = "http://localhost:8000/api/details";

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [details, setDetails] = useState(null); // ← API se aayega
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // ── Details fetch ──────────────────────────────────
  useEffect(() => {
    fetch(DETAILS_API)
      .then((r) => r.json())
      .then((d) => { setDetails(d); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ── Contact form submit ────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(CONTACT_API, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Error sending contact message:", err);
    } finally {
      setSending(false);
    }
  };



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .contact-page { font-family: 'Poppins', sans-serif; background: var(--bg); min-height: 100vh; padding: 5rem 1.5rem 4rem; transition: background 0.3s ease; }
        .contact-hero { text-align: center; margin-bottom: 4rem; }
        .contact-badge { display: inline-block; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #c4b5fd; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.35rem 1rem; border-radius: 100px; margin-bottom: 1.5rem; }
        .contact-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: var(--text-h); letter-spacing: -0.03em; margin: 0 0 1rem; transition: color 0.3s ease; }
        .contact-title span { background: linear-gradient(90deg, #8b5cf6, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .contact-subtitle { color: var(--text); font-size: 1rem; max-width: 480px; margin: 0 auto; line-height: 1.7; opacity: 0.8; transition: color 0.3s ease; }
        .contact-wrap { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.4fr; gap: 2rem; align-items: start; }
        .contact-info { display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-info-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; transition: all 0.3s ease; box-shadow: var(--shadow); }
        .contact-info-card:hover { border-color: rgba(139,92,246,0.3); transform: translateY(-2px); }
        .contact-info-icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(139, 92, 246, 0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #a78bfa; }
        .contact-info-label { font-size: 0.7rem; color: var(--text); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-bottom: 0.2rem; opacity: 0.7; }
        .contact-info-value { font-size: 0.875rem; color: #8b5cf6; font-weight: 600; }
        html.dark-mode .contact-info-value { color: #c4b5fd; }
        .contact-info-loading { opacity: 0.45; font-style: italic; }
        .contact-form-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; box-shadow: var(--shadow); transition: background 0.3s ease, border-color 0.3s ease; }
        .contact-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .contact-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .contact-label { font-size: 0.78rem; font-weight: 500; color: var(--text); letter-spacing: 0.04em; opacity: 0.8; }
        .contact-input, .contact-textarea { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 0.75rem 1rem; color: var(--text-h); font-family: 'Poppins', sans-serif; font-size: 0.875rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; box-sizing: border-box; }
        .contact-input:focus, .contact-textarea:focus { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }
        .contact-textarea { resize: vertical; min-height: 130px; }
        .contact-submit { display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff; border: none; border-radius: 10px; padding: 0.85rem 2rem; font-family: 'Poppins', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 15px rgba(139,92,246,0.35); }
        .contact-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(139,92,246,0.45); }
        .contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .contact-success { text-align: center; padding: 1.5rem; color: #86efac; font-size: 0.9rem; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); border-radius: 10px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 700px) { .contact-wrap { grid-template-columns: 1fr; } .contact-form-row { grid-template-columns: 1fr; } }
      `}</style>

      <div className="contact-page">
        <div className="contact-hero">
          <div className="contact-badge">Get In Touch</div>
          <h1 className="contact-title">Contact <span>Me</span></h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-wrap">
          {/* Info cards — API se data */}
          <div className="contact-info">
            {detailsz.map(({ icon: Icon, label, value }) => (
              <div key={label} className="contact-info-card">
                <div className="contact-info-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="contact-info-label">{label}</div>
                  <div className={`contact-info-value ${loading ? "contact-info-loading" : ""}`}>
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {sent ? (
              <div className="contact-success">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label className="contact-label">Name</label>
                    <input
                      className="contact-input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">Email</label>
                    <input
                      className="contact-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <label className="contact-label">Message</label>
                  <textarea
                    className="contact-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="contact-submit"
                  disabled={sending}
                >
                  <Send size={16} />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}