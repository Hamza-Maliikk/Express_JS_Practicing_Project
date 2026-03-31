import { useState } from "react";

const API_BASE = "http://localhost:8000/api";

export default function Register({ onRegister, onGoLogin }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "User"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const notify = (msg, isError = false) => {
    if (isError) { setError(msg); setTimeout(() => setError(""), 3000); }
    else { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); }
  };

  const handleSubmit = async () => {
    if (!form.first_name.trim() || !form.email.trim() || !form.password.trim()) {
      notify("Sab zaroori fields bharein!", true); return;
    }
    if (form.password !== form.confirm_password) {
      notify("Dono passwords match nahi karte!", true); return;
    }
    if (form.password.length < 6) {
      notify("Password kam az kam 6 characters ka hona chahiye!", true); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        notify("Account ban gaya! Login karein.");
        setTimeout(() => onGoLogin?.(), 1500);
      } else {
        notify(data.message || "Register nahi ho saka!", true);
      }
    } catch {
      notify("Server se connect nahi ho saka!", true);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  // Password strength
  const strength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };
  const strengthLabel = ["", "Bohot Kamzor", "Kamzor", "Theek Hai", "Mazboot", "Bohot Mazboot"];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-bg {
          min-height: 100vh;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse at 20% 20%, #1a0533 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #001233 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 { width: 300px; height: 300px; background: #a855f7; top: -100px; left: -100px; animation-delay: 0s; }
        .orb-2 { width: 200px; height: 200px; background: #3b82f6; bottom: -80px; right: -80px; animation-delay: 3s; }
        .orb-3 { width: 150px; height: 150px; background: #7c3aed; top: 40%; right: 5%; animation-delay: 5s; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .grid-pattern {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(#ffffff04 1px, transparent 1px),
            linear-gradient(90deg, #ffffff04 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .reg-card {
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          max-width: 460px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent);
        }

        .reg-logo {
          text-align: center;
          margin-bottom: 1.8rem;
        }
        .logo-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          box-shadow: 0 0 30px #a855f740;
          animation: pulse 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px #a855f740; }
          50%       { box-shadow: 0 0 40px #a855f770; }
        }
        .reg-logo h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .reg-logo p { font-size: 0.82rem; color: #475569; margin-top: 0.2rem; }

        /* Toasts */
        .toast-box {
          padding: 0.7rem 1rem;
          border-radius: 8px;
          font-size: 0.83rem;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .toast-error { background: #450a0a; border: 1px solid #ef444440; color: #fca5a5; animation: shake 0.4s ease; }
        .toast-success { background: #14532d; border: 1px solid #22c55e40; color: #86efac; animation: slideIn 0.3s ease; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

        /* Two column grid */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
        @media (max-width: 480px) { .two-col { grid-template-columns: 1fr; } }

        .input-group { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 1rem; }
        .input-group label { font-size: 0.72rem; color: #64748b; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }

        .input-field { position: relative; }
        .input-field input, .input-field select {
          width: 100%;
          background: #0d0d15;
          border: 1px solid #1e1e30;
          border-radius: 10px;
          padding: 0.75rem 1rem 0.75rem 2.6rem;
          color: #e2e8f0;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field input:focus, .input-field select:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px #a855f720;
        }
        .input-field input::placeholder { color: #334155; }
        .input-field select option { background: #111118; }

        .input-icon {
          position: absolute;
          left: 0.85rem; top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          pointer-events: none;
          opacity: 0.5;
        }
        .pass-toggle {
          position: absolute;
          right: 0.85rem; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; color: #475569;
          font-size: 0.78rem;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .pass-toggle:hover { color: #a855f7; }

        /* Password strength bar */
        .strength-bar {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .strength-segments {
          display: flex;
          gap: 0.25rem;
        }
        .seg {
          flex: 1; height: 3px;
          border-radius: 100px;
          background: #1e1e2e;
          transition: background 0.3s;
        }
        .strength-text {
          font-size: 0.72rem;
          color: #475569;
          transition: color 0.3s;
        }

        /* Role select — no left padding needed */
        .input-field select { padding-left: 2.6rem; }

        .btn-register {
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 0 25px #a855f740;
          position: relative;
          overflow: hidden;
          margin-top: 0.4rem;
        }
        .btn-register::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #c084fc, #a855f7);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-register:hover:not(:disabled)::after { opacity: 1; }
        .btn-register:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 40px #a855f760; }
        .btn-register:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-register span { position: relative; z-index: 1; }

        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid #ffffff40;
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 0.4rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex; align-items: center; gap: 0.8rem;
          margin: 1.2rem 0; color: #1e1e2e; font-size: 0.75rem;
        }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #1e1e2e; }
        .divider span { color: #334155; white-space: nowrap; }

        .reg-footer {
          text-align: center;
          margin-top: 1.2rem;
          font-size: 0.8rem;
          color: #475569;
        }
        .reg-footer a {
          color: #a855f7; text-decoration: none;
          font-weight: 600; cursor: pointer;
          transition: color 0.2s;
        }
        .reg-footer a:hover { color: #c084fc; }

        .bottom-tag {
          position: fixed;
          bottom: 1.2rem; left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem; color: #1e1e2e;
          white-space: nowrap;
        }
      `}</style>

      <div className="reg-bg">
        <div className="grid-pattern" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="reg-card">
          {/* Logo */}
          <div className="reg-logo">
            <div className="logo-icon">✨</div>
            <h2>Account Banayein</h2>
            <p>Naya account register karein</p>
          </div>

          {/* Toasts */}
          {error   && <div className="toast-box toast-error">⚠ {error}</div>}
          {success && <div className="toast-box toast-success">✓ {success}</div>}

          {/* First + Last name */}
          <div className="two-col">
            <div className="input-group">
              <label>Pehla Naam</label>
              <div className="input-field">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Ali"
                  value={form.first_name}
                  onChange={e => setForm({ ...form, first_name: e.target.value })}
                  onKeyDown={handleKey}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Aakhri Naam</label>
              <div className="input-field">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Hassan"
                  value={form.last_name}
                  onChange={e => setForm({ ...form, last_name: e.target.value })}
                  onKeyDown={handleKey}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-field">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="ali@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onKeyDown={handleKey}
              />
            </div>
          </div>

          {/* Role */}
          <div className="input-group">
            <label>Role</label>
            <div className="input-field">
              <span className="input-icon">🏷️</span>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <span className="input-icon">🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={handleKey}
              />
              <button className="pass-toggle" onClick={() => setShowPass(!showPass)} type="button">
                {showPass ? "Chhupao" : "Dikhao"}
              </button>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div className="strength-bar">
                <div className="strength-segments">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className="seg"
                      style={{ background: i <= strength() ? strengthColor[strength()] : "#1e1e2e" }}
                    />
                  ))}
                </div>
                <span className="strength-text" style={{ color: strengthColor[strength()] }}>
                  Password: {strengthLabel[strength()]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Password Dobara</label>
            <div className="input-field">
              <span className="input-icon">🔐</span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirm_password}
                onChange={e => setForm({ ...form, confirm_password: e.target.value })}
                onKeyDown={handleKey}
                style={{
                  borderColor: form.confirm_password
                    ? form.password === form.confirm_password ? "#22c55e" : "#ef4444"
                    : ""
                }}
              />
              <button className="pass-toggle" onClick={() => setShowConfirm(!showConfirm)} type="button">
                {showConfirm ? "Chhupao" : "Dikhao"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button className="btn-register" onClick={handleSubmit} disabled={loading}>
            <span>
              {loading && <span className="spinner" />}
              {loading ? "Register ho raha hai..." : "Account Banayein →"}
            </span>
          </button>

          <div className="divider"><span>ya</span></div>

          <div className="reg-footer">
            Pehle se account hai?{" "}
            <a onClick={onGoLogin}>Login karein</a>
          </div>
        </div>

        <div className="bottom-tag">User Management Dashboard © 2025</div>
      </div>
    </>
  );
}