import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Project" },
  { to: "/skills", label: "Skills" },
  { to: "/blog", label: "Blogs" },
];

// ── Dark mode helper ──────────────────────────────────────────────────────────
function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
  } else {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
  }
  localStorage.setItem("theme", theme);
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [theme, setTheme]         = useState(getInitialTheme);
  const navigate = useNavigate();

  // Apply theme on mount and whenever it changes
  useEffect(() => { applyTheme(theme); }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        /* ── Theme variables handled globally in index.css ── */
        :root {
          --hn-logo-color:  #111;
          --hn-link-color:  #555;
          --hn-link-active: #111;
          --hn-bg-scroll:   rgba(255,255,255,0.93);
          --hn-border:      #e8e4de;
          --hn-mob-bg:      rgba(255,255,255,0.97);
          --hn-mob-border:  #e8e4de;
          --hn-mob-divider: #f0ece6;
          --hn-outline-color: #111;
          --hn-outline-border: #bbb;
          --hn-outline-hover-bg: #f8f8f6;
          --hn-outline-hover-border: #555;
          --hn-ham-color:   #111;
        }

        html.dark-mode {
          --hn-logo-color:  #f0f0f0;
          --hn-link-color:  #aaa;
          --hn-link-active: #fff;
          --hn-bg-scroll:   rgba(15, 15, 15, 0.92);
          --hn-border:      rgba(255,255,255,0.08);
          --hn-mob-bg:      rgba(15,15,15,0.97);
          --hn-mob-border:  rgba(255,255,255,0.06);
          --hn-mob-divider: rgba(255,255,255,0.06);
          --hn-outline-color: #ccc;
          --hn-outline-border: rgba(255,255,255,0.2);
          --hn-outline-hover-bg: rgba(255,255,255,0.06);
          --hn-outline-hover-border: rgba(255,255,255,0.4);
          --hn-ham-color:   #eee;
        }

        .hn-navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          height: 60px;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
        }

        .hn-navbar.scrolled {
          background: var(--hn-bg-scroll);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 0.5px solid var(--hn-border);
        }

        .hn-logo {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--hn-logo-color);
          text-decoration: none;
          transition: color 0.3s;
        }

        .hn-nav { display: flex; gap: 36px; }

        .hn-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: var(--hn-link-color);
          cursor: pointer;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1.5px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: 0.01em;
        }
        .hn-link:hover, .hn-link.active {
          color: var(--hn-link-active);
          border-bottom-color: var(--hn-link-active);
        }

        .hn-actions { display: flex; gap: 12px; align-items: center; }

        /* ── Theme toggle button ── */
        .hn-theme-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--hn-outline-border);
          background: transparent;
          color: var(--hn-outline-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .hn-theme-btn:hover {
          background: var(--hn-outline-hover-bg);
          border-color: var(--hn-outline-hover-border);
          transform: rotate(15deg) scale(1.05);
        }

        .hn-btn-outline {
          background: transparent;
          color: var(--hn-outline-color);
          border: 1px solid var(--hn-outline-border);
          padding: 9px 18px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .hn-btn-outline:hover {
          border-color: var(--hn-outline-hover-border);
          background: var(--hn-outline-hover-bg);
        }

        .hn-btn-primary {
          background: #1d4ed8;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .hn-btn-primary:hover {
          background: #1e40af;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .hn-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hn-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--hn-ham-color);
          border-radius: 2px;
          transition: all 0.3s;
        }

        .hn-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 1rem 1.5rem 1.5rem;
          gap: 0.5rem;
          background: var(--hn-mob-bg);
          border-top: 0.5px solid var(--hn-mob-border);
          backdrop-filter: blur(14px);
        }
        .hn-mobile-menu.open { display: flex; }

        .hn-mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--hn-link-color);
          text-decoration: none;
          padding: 8px 4px;
          border-bottom: 0.5px solid var(--hn-mob-divider);
          transition: color 0.2s;
        }
        .hn-mobile-link:hover, .hn-mobile-link.active {
          color: var(--hn-link-active);
        }

        .hn-mob-theme-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 4px;
          border-bottom: 0.5px solid var(--hn-mob-divider);
        }
        .hn-mob-theme-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--hn-link-color);
        }

        @media (max-width: 768px) {
          .hn-nav { display: none; }
          .hn-btn-outline { display: none; }
          .hn-btn-primary { display: none; }
          .hn-theme-btn { display: none; }
          .hn-hamburger { display: flex; }
          .hn-navbar { padding: 0 24px; }
        }
      `}</style>

      <header className={`hn-navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <NavLink to="/" className="">My Portfolio</NavLink>

        {/* Desktop nav */}
        <nav className="hn-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `hn-link${isActive ? " active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hn-actions">
          <button
            className="hn-theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>

          <button
            className="hn-btn-outline"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>

          <NavLink to="/contact" className="hn-btn-primary">
            Contact
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hn-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile menu */}
      <div
        className={`hn-mobile-menu${menuOpen ? " open" : ""}`}
        style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199 }}
      >
        {/* Theme toggle row in mobile menu */}
        <div className="hn-mob-theme-row">
          <span className="hn-mob-theme-label">
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            className="hn-theme-btn"
            style={{ display: "flex" }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `hn-mobile-link${isActive ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        <button
          className="hn-btn-outline"
          style={{ display: "flex", marginTop: "0.5rem" }}
          onClick={() => { navigate("/login"); setMenuOpen(false); }}
        >
          Admin Login
        </button>
      </div>
    </>
  );
}
