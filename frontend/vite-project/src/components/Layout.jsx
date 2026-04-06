import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/slices/loginSlice/check";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/education", label: "Education" },
  { to: "/blogs", label: "Blogs" },
  { to: "/categories", label: "Categories" },
];

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const role =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : "";
  const initial = (email && email[0]?.toUpperCase()) || "U";

  const logOut = () => {
    dispatch(clearToken());
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,500;1,300&display=swap');

        .app-shell {
          display: flex;
          min-height: 100vh;
          background: #f8f7f4;
          font-family: 'DM Mono', monospace;
          color: #1a1a1a;
        }

        .app-sidebar {
          width: 220px;
          background: #1a1a1a;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.2rem;
          flex-shrink: 0;
        }
        .app-sidebar-logo {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #f8f7f4;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
        }
        .app-sidebar-logo span { color: #a3e635; }

        .app-nav-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.78rem;
          color: #6b7280;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          margin-bottom: 0.2rem;
          letter-spacing: 0.02em;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          box-sizing: border-box;
        }
        .app-nav-link:hover { background: #2a2a2a; color: #e5e7eb; }
        .app-nav-link.active { background: #a3e635; color: #1a1a1a; font-weight: 500; }

        .app-nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
          flex-shrink: 0;
        }
        .app-nav-link.active .app-nav-dot { opacity: 1; }

        .app-sidebar-bottom {
          margin-top: auto;
          border-top: 1px solid #2a2a2a;
          padding-top: 1rem;
        }
        .app-sidebar-user {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .app-sidebar-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #a3e635;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 500;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .app-sidebar-name {
          font-size: 0.75rem;
          color: #9ca3af;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 120px;
        }
        .app-sidebar-role { font-size: 0.65rem; color: #4b5563; }

        .app-logout {
          margin-top: 0.75rem;
          color: #9ca3af;
        }
        .app-logout:hover { color: #fca5a5; background: #2a2020; }

        .app-main {
          flex: 1;
          padding: 2rem 2.5rem;
          overflow-x: auto;
          min-width: 0;
        }

        @media (max-width: 900px) {
          .app-sidebar { width: 180px; padding: 1.5rem 1rem; }
          .app-main { padding: 1.5rem; }
        }
      `}</style>

      <div className="app-shell">
        <aside className="app-sidebar">
          <div className="app-sidebar-logo">
            usr<span>.</span>mgmt
          </div>
          <nav>
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `app-nav-link${isActive ? " active" : ""}`
                }
                end={to === "/dashboard"}
              >
                <span className="app-nav-dot" />
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              className="app-nav-link app-logout"
              onClick={logOut}
            >
              <span className="app-nav-dot" />
              Logout
            </button>
          </nav>
          <div className="app-sidebar-bottom">
            <div className="app-sidebar-user">
              <div className="app-sidebar-avatar">{initial}</div>
              <div>
                <div className="app-sidebar-name" title={email || ""}>
                  {email || "Signed in"}
                </div>
                <div className="app-sidebar-role">{role || "Member"}</div>
              </div>
            </div>
          </div>
        </aside>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
