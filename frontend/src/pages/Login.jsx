import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/loginSlice/check";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000/api/login";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setToken(data.token));
        if (data.email) localStorage.setItem("userEmail", data.email);
        if (data.role) localStorage.setItem("userRole", data.role);
        const roleText = String(data.role || "").toLowerCase();
        const isAdmin = Boolean(data.isAdmin) || roleText.includes("admin");
        localStorage.setItem("isAdmin", String(isAdmin));
        navigate("/portfolio");
      } else {
        setError(data.message || "Invalid email or password.");
        setTimeout(() => setForm({ email: "", password: "" }), 3000);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .l-root {
          min-height: 100vh;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle noise texture overlay */
        .l-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Dim corner glow */
        .l-glow-tl {
          position: absolute;
          top: -200px; left: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, #ffffff08 0%, transparent 70%);
          pointer-events: none;
        }
        .l-glow-br {
          position: absolute;
          bottom: -200px; right: -200px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, #ffffff06 0%, transparent 70%);
          pointer-events: none;
        }

        /* Thin horizontal scan line */
        .l-scanline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #ffffff15 30%, #ffffff30 50%, #ffffff15 70%, transparent 100%);
          animation: scan 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Card */
        .l-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 400px;
          background: #0f0f0f;
          border: 1px solid #1c1c1c;
          border-radius: 20px;
          padding: 3rem 2.5rem 2.5rem;
          animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top glow line on card */
        .l-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffffff40, transparent);
          border-radius: 100%;
        }

        /* Brand */
        .l-brand {
          margin-bottom: 2.4rem;
          text-align: center;
        }
        .l-brand-mark {
          width: 44px; height: 44px;
          background: #fff;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .l-brand-mark svg {
          width: 22px; height: 22px;
          stroke: #000;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .l-brand h1 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .l-brand p {
          font-size: 0.8rem;
          color: #3a3a3a;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Error */
        .l-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #160a0a;
          border: 1px solid #2a1010;
          color: #e05c5c;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.82rem;
          margin-bottom: 1.4rem;
          animation: shake 0.35s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-5px); }
          75%       { transform: translateX(5px); }
        }

        /* Field */
        .l-field {
          margin-bottom: 1rem;
        }
        .l-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #333;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 0.5rem;
        }
        .l-input-wrap {
          position: relative;
        }
        .l-input-wrap input {
          width: 100%;
          background: #080808;
          border: 1px solid #1c1c1c;
          border-radius: 10px;
          padding: 0.78rem 1rem 0.78rem 2.6rem;
          color: #e8e8e8;
          font-size: 0.9rem;
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #fff;
        }
        .l-input-wrap input::placeholder {
          color: #252525;
          font-size: 0.85rem;
        }
        .l-input-wrap input:focus {
          border-color: #333;
          box-shadow: 0 0 0 3px #ffffff08;
        }
        .l-input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #2a2a2a;
          display: flex;
        }
        .l-input-icon svg {
          width: 15px; height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .l-pass-btn {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #2a2a2a;
          display: flex;
          padding: 0.2rem;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .l-pass-btn:hover { color: #666; }
        .l-pass-btn svg {
          width: 15px; height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Meta row */
        .l-meta {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.8rem;
          margin-top: 0.2rem;
        }
        .l-forgot {
          font-size: 0.78rem;
          color: #2e2e2e;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.2s;
        }
        .l-forgot:hover { color: #666; }

        /* Button */
        .l-btn {
          width: 100%;
          padding: 0.85rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .l-btn:hover:not(:disabled) {
          background: #e8e8e8;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px #ffffff18;
        }
        .l-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .l-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Spinner */
        .l-spinner {
          width: 14px; height: 14px;
          border: 2px solid #00000030;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .l-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #141414;
        }
        .l-footer span {
          font-size: 0.72rem;
          color: #1e1e1e;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="l-root">
        <div className="l-glow-tl" />
        <div className="l-glow-br" />
        <div className="l-scanline" />

        <div className="l-card">
          {/* Brand */}
          <div className="l-brand">
            <div className="l-brand-mark">
              <svg viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h1>Admin Panel</h1>
            <p>Portfolio Dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="l-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="l-field">
            <label className="l-label">Email</label>
            <div className="l-input-wrap">
              <span className="l-input-icon">
                <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={handleKey}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="l-field">
            <label className="l-label">Password</label>
            <div className="l-input-wrap">
              <span className="l-input-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={handleKey}
                autoComplete="current-password"
              />
              <button className="l-pass-btn" onClick={() => setShowPass(!showPass)} type="button" tabIndex={-1}>
                {showPass ? (
                  <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="l-meta">
            <a href="#" className="l-forgot">Forgot password?</a>
          </div>

          {/* Submit */}
          <button className="l-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <><span className="l-spinner" /> Signing in...</>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Footer */}
          <div className="l-footer">
            <span>Portfolio Admin &copy; 2025</span>
          </div>
        </div>
      </div>
    </>
  );
}