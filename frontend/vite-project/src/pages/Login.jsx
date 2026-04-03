import { useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/loginSlice/check";
import {useNavigate} from "react-router-dom";

const API_BASE = "http://localhost:8000/";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email aur password zaroori hain!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Response from server:", data);

      if (res.ok) {
        navigate('/dashboard')
        dispatch(setToken(data.token)); // ✅ Redux store mein token save
        console.log("Login successful:", data)
      } else {
        setError(data.message || "Email ya password galat hai!");
        setTimeout(() => setForm({ email: "", password: "" }), 3000);
      }
    } catch {
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-bg {
          min-height: 100vh;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse at 20% 20%, #1a0533 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #001233 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #0d0d1a 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Floating orbs background */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 {
          width: 300px; height: 300px;
          background: #a855f7;
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 200px; height: 200px;
          background: #3b82f6;
          bottom: -80px; right: -80px;
          animation-delay: 3s;
        }
        .orb-3 {
          width: 150px; height: 150px;
          background: #7c3aed;
          top: 50%; right: 10%;
          animation-delay: 5s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        /* Grid pattern */
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#ffffff04 1px, transparent 1px),
            linear-gradient(90deg, #ffffff04 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Card */
        .login-card {
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        /* Glow border top */
        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent);
          border-radius: 100%;
        }

        /* Logo */
        .login-logo {
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
          animation: logoPulse 3s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 20px #a855f740; }
          50%       { box-shadow: 0 0 40px #a855f770; }
        }
        .login-logo h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .login-logo p {
          font-size: 0.82rem;
          color: #475569;
          margin-top: 0.2rem;
        }

        /* Error toast */
        .login-error {
          background: #450a0a;
          border: 1px solid #ef444440;
          color: #fca5a5;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          font-size: 0.83rem;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }

        /* Inputs */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 1rem;
        }
        .input-group label {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .input-field {
          position: relative;
        }
        .input-field input {
          width: 100%;
          background: #0d0d15;
          border: 1px solid #1e1e30;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          padding-left: 2.6rem;
          color: #e2e8f0;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px #a855f720;
        }
        .input-field input::placeholder { color: #334155; }
        .input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          pointer-events: none;
          opacity: 0.5;
        }
        .pass-toggle {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          font-size: 0.8rem;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .pass-toggle:hover { color: #a855f7; }

        /* Remember + Forgot */
        .form-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.4rem;
          font-size: 0.8rem;
        }
        .remember {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #64748b;
          cursor: pointer;
        }
        .remember input[type="checkbox"] {
          accent-color: #a855f7;
          width: 14px; height: 14px;
        }
        .forgot {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .forgot:hover { color: #c084fc; }

        /* Login button */
        .btn-login {
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
        }
        .btn-login::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #c084fc, #a855f7);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-login:hover:not(:disabled)::after { opacity: 1; }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 40px #a855f760;
        }
        .btn-login:active:not(:disabled) { transform: translateY(0); }
        .btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-login span { position: relative; z-index: 1; }

        /* Loading spinner */
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

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin: 1.2rem 0;
          color: #1e1e2e;
          font-size: 0.75rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1e1e2e;
        }
        .divider span { color: #334155; white-space: nowrap; }

        /* Footer */
        .login-footer {
          text-align: center;
          margin-top: 1.4rem;
          font-size: 0.8rem;
          color: #475569;
        }
        .login-footer a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .login-footer a:hover { color: #c084fc; }

        /* Bottom tag */
        .bottom-tag {
          position: absolute;
          bottom: 1.2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          color: #1e1e2e;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="login-bg">
        {/* Background effects */}
        <div className="grid-pattern" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Card */}
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon">👤</div>
            <h2>User Management</h2>
            <p>Apne account mein login karein</p>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              ⚠ {error}
            </div>
          )}

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
              <button
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
                type="button"
              >
                {showPass ? "Chhupao" : "Dikhao"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="form-meta">
            <label className="remember">
              <input type="checkbox" />
              Yaad rakho
            </label>
            <a href="#" className="forgot">Password bhool gaye?</a>
          </div>

          {/* Submit */}
          <button
            className="btn-login"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span>
              {loading && <span className="spinner" />}
              {loading ? "Logging..." : "Login"}
            </span>
          </button>

          <div className="divider"><span>ya</span></div>

          {/* Footer */}
          <div className="login-footer">
            Account nahi hai?{" "}
            <Link to="/register"><a> Register karein</a></Link>
          </div>
        </div>

        <div className="bottom-tag">User Management Dashboard © 2025</div>
      </div>
    </>
  );
}