import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Project" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .hn-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          height: 60px;
          font-family: 'DM Sans', sans-serif;
          background: ${"`"}${"`"}${"`"}transparent${"`"}${"`"}${"`"};
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
        }

        .hn-navbar.scrolled {
          background: rgba(255, 255, 255, 0.93);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 0.5px solid #e8e4de;
        }

        .hn-logo {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111;
          text-decoration: none;
        }

        .hn-nav {
          display: flex;
          gap: 36px;
        }

        .hn-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #555;
          cursor: pointer;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1.5px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: 0.01em;
        }

        .hn-link:hover,
        .hn-link.active {
          color: #111;
          border-bottom-color: #111;
        }

        .hn-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .hn-btn-outline {
          background: transparent;
          color: #111;
          border: 1px solid #bbb;
          padding: 10px 20px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .hn-btn-outline:hover {
          border-color: #555;
          background: #f8f8f6;
        }

        .hn-btn-primary {
          background: #1d4ed8;
          color: #fff;
          border: none;
          padding: 11px 22px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
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
          background: #111;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .hn-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 1rem 1.5rem 1.5rem;
          gap: 0.5rem;
          background: rgba(255,255,255,0.97);
          border-top: 0.5px solid #e8e4de;
          backdrop-filter: blur(14px);
        }

        .hn-mobile-menu.open { display: flex; }

        .hn-mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #555;
          text-decoration: none;
          padding: 8px 4px;
          border-bottom: 0.5px solid #f0ece6;
          transition: color 0.2s;
        }

        .hn-mobile-link:hover,
        .hn-mobile-link.active {
          color: #111;
        }

        @media (max-width: 768px) {
          .hn-nav { display: none; }
          .hn-btn-outline { display: none; }
          .hn-hamburger { display: flex; }
          .hn-navbar { padding: 0 24px; }
        }
      `}</style>

      <header className={`hn-navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <NavLink to="/" className="hn-logo">My Portfolio</NavLink>

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
            className="hn-btn-outline"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>
          <NavLink to="/contact" className="hn-btn-primary">
            Contact
          </NavLink>
        </div>

        {/* Hamburger */}
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
      <div className={`hn-mobile-menu${menuOpen ? " open" : ""}`}
        style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199 }}
      >
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
      </div>
    </>
  );
}
