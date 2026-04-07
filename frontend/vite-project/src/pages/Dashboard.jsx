import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const API_BASE = "http://localhost:8000/dashboard";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_BASE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        navigate("/");
        return;
      }
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        setError(errBody.error || `Request failed (${res.status})`);
        setUsers([]);
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Dashboard fetch error", e);
      setError("Could not load users. Is the API running?");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const greetingName = useMemo(() => {
    const email = localStorage.getItem("userEmail") || "";
    if (email) return email.split("@")[0];
    if (users[0]?.name) return users[0].name.split(" ")[0];
    return "there";
  }, [users]);



  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "Admin").length;
    const editors = users.filter((u) => u.role === "Editor").length;
    const t0 = startOfToday().getTime();
    const newToday = users.filter((u) => {
      if (!u.createdAt) return false;
      return new Date(u.createdAt).getTime() >= t0;
    }).length;
    return { total, admins, editors, newToday };
  }, [users]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,500;1,300&display=swap');

        .dash-page * { box-sizing: border-box; }

        .dash-page {
          font-family: 'DM Mono', monospace;
          color: #1a1a1a;
        }

        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .dash-title {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: #1a1a1a;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .dash-date { font-size: 0.72rem; color: #9ca3af; margin-top: 0.3rem; }

        .dash-btn {
          background: #1a1a1a;
          color: #f8f7f4;
          border: none;
          border-radius: 8px;
          padding: 0.55rem 1.1rem;
          font-size: 0.75rem;
          font-family: 'DM Mono', monospace;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.02em;
        }
        .dash-btn:hover { background: #2a2a2a; }
        .dash-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .dash-stat {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.2rem;
          position: relative;
          overflow: hidden;
        }
        .dash-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .dash-stat.green::before { background: #a3e635; }
        .dash-stat.blue::before  { background: #60a5fa; }
        .dash-stat.amber::before { background: #fb923c; }
        .dash-stat.pink::before  { background: #f472b6; }

        .dash-stat-label { font-size: 0.68rem; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .dash-stat-value { font-size: 1.7rem; font-weight: 500; color: #1a1a1a; line-height: 1; margin-bottom: 0.3rem; }
        .dash-stat-change { font-size: 0.7rem; color: #6b7280; }

        .dash-charts {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .dash-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.4rem;
        }
        .dash-card-title {
          font-size: 0.72rem;
          color: #9ca3af;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }

        .dash-table-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .dash-search {
          background: #f8f7f4;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          font-family: 'DM Mono', monospace;
          color: #1a1a1a;
          outline: none;
          width: min(220px, 100%);
          transition: border-color 0.15s;
        }
        .dash-search:focus { border-color: #a3e635; }
        .dash-search::placeholder { color: #9ca3af; }

        .dash-table-wrap { overflow-x: auto; }
        .dash-table { width: 100%; border-collapse: collapse; min-width: 520px; }
        .dash-table thead th {
          font-size: 0.65rem;
          color: #9ca3af;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: left;
          padding: 0.5rem 0.8rem;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 400;
        }
        .dash-table tbody tr { transition: background 0.1s; }
        .dash-table tbody tr:hover { background: #fafaf9; }
        .dash-table tbody td {
          padding: 0.75rem 0.8rem;
          font-size: 0.78rem;
          color: #374151;
          border-bottom: 1px solid #f8f7f4;
          vertical-align: middle;
        }

        .dash-user-cell { display: flex; align-items: center; gap: 0.6rem; }
        .dash-user-av {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem;
          font-weight: 500;
          color: #fff;
          flex-shrink: 0;
        }
        .dash-user-name { font-size: 0.78rem; color: #1a1a1a; }
        .dash-user-email { font-size: 0.65rem; color: #9ca3af; }

        .dash-badge {
          display: inline-block;
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          font-size: 0.65rem;
          border: 1px solid #e5e7eb;
          letter-spacing: 0.03em;
          background: #fafaf9;
        }

        .dash-empty td {
          text-align: center;
          padding: 2rem;
          color: #9ca3af;
          font-size: 0.78rem;
        }

        .dash-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          font-size: 0.78rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
          .dash-charts { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-page">
        <div className="dash-header">
          <div>
            <div className="dash-title">Hello, {greetingName}</div>
            <div className="dash-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {error && <div className="dash-banner">{error}</div>}
      </div>
    </>
  );
}
