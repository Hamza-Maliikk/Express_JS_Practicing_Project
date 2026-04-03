import { useEffect } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const lineData = [
  { month: "Jan", users: 40 },
  { month: "Feb", users: 65 },
  { month: "Mar", users: 58 },
  { month: "Apr", users: 90 },
  { month: "May", users: 120 },
  { month: "Jun", users: 105 },
  { month: "Jul", users: 148 },
];

const barData = [
  { day: "Mon", visits: 30 },
  { day: "Tue", visits: 55 },
  { day: "Wed", visits: 40 },
  { day: "Thu", visits: 70 },
  { day: "Fri", visits: 90 },
  { day: "Sat", visits: 45 },
  { day: "Sun", visits: 25 },
];

const recentUsers = [
  {
    name: "Ali Hassan",
    email: "ali@example.com",
    role: "Admin",
    status: "Active",
    joined: "2 hrs ago",
  },
  {
    name: "Sara Khan",
    email: "sara@example.com",
    role: "Editor",
    status: "Active",
    joined: "5 hrs ago",
  },
  {
    name: "Hamza Ali",
    email: "hamza@example.com",
    role: "User",
    status: "Inactive",
    joined: "1 day ago",
  },
  {
    name: "Zara Malik",
    email: "zara@example.com",
    role: "User",
    status: "Active",
    joined: "2 days ago",
  },
  {
    name: "Usman Raza",
    email: "usman@example.com",
    role: "Editor",
    status: "Active",
    joined: "3 days ago",
  },
];

const navItems = ["Dashboard", "Users", "Analytics", "Settings"];

const roleColor = (role) => {
  if (role === "Admin")
    return { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" };
  if (role === "Editor")
    return { bg: "#fffbeb", color: "#d97706", border: "#fde68a" };
  return { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" };
};

const statusColor = (s) =>
  s === "Active"
    ? { bg: "#f0fdf4", color: "#16a34a" }
    : { bg: "#f8fafc", color: "#94a3b8" };

const avatar = (name) => name.charAt(0).toUpperCase();

const avatarBg = (name) => {
  const colors = ["#818cf8", "#34d399", "#fb923c", "#f472b6", "#60a5fa"];
  return colors[name.charCodeAt(0) % colors.length];
};
const token = localStorage.getItem("token");
const API_BASE = "http://localhost:8000/dashboard";
export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [stats, setstats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_BASE ,{
            method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
        }})
        if (res.status === 401) {
          console.log("Unauthorized access - redirecting to login");
          window.location.href = "/";
        }
        const data = await res.json();
        setstats(data);
      } catch (error) {
        console.error("API error", error);
      }
    };
    fetchData();
  }, []);

  const filtered = recentUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,500;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          display: flex;
          min-height: 100vh;
          background: #f8f7f4;
          font-family: 'DM Mono', monospace;
          color: #1a1a1a;
        }

        /* Sidebar */
        .sidebar {
          width: 220px;
          background: #1a1a1a;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.2rem;
          flex-shrink: 0;
        }
        .sidebar-logo {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #f8f7f4;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
        }
        .sidebar-logo span { color: #a3e635; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.78rem;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 0.2rem;
          letter-spacing: 0.02em;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .nav-item:hover { background: #2a2a2a; color: #e5e7eb; }
        .nav-item.active { background: #a3e635; color: #1a1a1a; font-weight: 500; }

        .nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
          flex-shrink: 0;
        }
        .nav-item.active .nav-dot { opacity: 1; }

        .sidebar-bottom {
          margin-top: auto;
          border-top: 1px solid #2a2a2a;
          padding-top: 1rem;
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .sidebar-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #a3e635;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 500;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .sidebar-name { font-size: 0.75rem; color: #9ca3af; }
        .sidebar-role { font-size: 0.65rem; color: #4b5563; }

        /* Main */
        .main {
          flex: 1;
          padding: 2rem 2.5rem;
          overflow-x: hidden;
        }

        .page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .page-title {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: #1a1a1a;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .page-title em { font-style: italic; color: #6b7280; }
        .page-date { font-size: 0.72rem; color: #9ca3af; margin-top: 0.3rem; }

        .header-btn {
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
        .header-btn:hover { background: #2a2a2a; }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.2rem;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .stat-card.green::before { background: #a3e635; }
        .stat-card.blue::before  { background: #60a5fa; }
        .stat-card.amber::before { background: #fb923c; }
        .stat-card.pink::before  { background: #f472b6; }

        .stat-label { font-size: 0.68rem; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .stat-value { font-size: 1.7rem; font-weight: 500; color: #1a1a1a; line-height: 1; margin-bottom: 0.3rem; }
        .stat-change { font-size: 0.7rem; color: #16a34a; }
        .stat-change.down { color: #dc2626; }

        /* Charts row */
        .charts-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .chart-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.4rem;
        }
        .chart-title {
          font-size: 0.72rem;
          color: #9ca3af;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }

        /* Table */
        .table-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.4rem;
        }
        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .search-input {
          background: #f8f7f4;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          font-family: 'DM Mono', monospace;
          color: #1a1a1a;
          outline: none;
          width: 200px;
          transition: border-color 0.15s;
        }
        .search-input:focus { border-color: #a3e635; }
        .search-input::placeholder { color: #9ca3af; }

        table { width: 100%; border-collapse: collapse; }
        thead th {
          font-size: 0.65rem;
          color: #9ca3af;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: left;
          padding: 0.5rem 0.8rem;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 400;
        }
        tbody tr { transition: background 0.1s; }
        tbody tr:hover { background: #fafaf9; }
        tbody td {
          padding: 0.75rem 0.8rem;
          font-size: 0.78rem;
          color: #374151;
          border-bottom: 1px solid #f8f7f4;
          vertical-align: middle;
        }

        .user-cell { display: flex; align-items: center; gap: 0.6rem; }
        .user-av {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem;
          font-weight: 500;
          color: #fff;
          flex-shrink: 0;
        }
        .user-name { font-size: 0.78rem; color: #1a1a1a; }
        .user-email { font-size: 0.65rem; color: #9ca3af; }

        .badge {
          display: inline-block;
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          font-size: 0.65rem;
          border: 1px solid;
          letter-spacing: 0.03em;
        }

        .empty-row td {
          text-align: center;
          padding: 2rem;
          color: #9ca3af;
          font-size: 0.78rem;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .charts-row { grid-template-columns: 1fr; }
          .sidebar { width: 180px; }
          .main { padding: 1.5rem; }
        }
      `}</style>

      <div className="dash-root">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            usr<span>.</span>mgmt
          </div>

          <nav>
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-item ${active === item ? "active" : ""}`}
                onClick={() => setActive(item)}
              >
                <span className="nav-dot" />
                {item}
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">A</div>
              <div>
                <div className="sidebar-name">Admin</div>
                <div className="sidebar-role">Super Admin</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main">
          <div className="page-header">
            <div>
              <div className="page-title">
                Good morning, {stats && stats[0]?.name}
              </div>
              <div className="page-date">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <button className="header-btn">+ Add User</button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {[
              {
                label: "Total Users",
                value: "148",
                change: "+12% this month",
                accent: "green",
              },
              {
                label: "Active Now",
                value: "34",
                change: "+5 from yesterday",
                accent: "blue",
              },
              {
                label: "Admins",
                value: "6",
                change: "No change",
                accent: "amber",
              },
              {
                label: "New Today",
                value: "9",
                change: "+3 from avg",
                accent: "pink",
              },
            ].map((s) => (
              <div key={s.label} className={`stat-card ${s.accent}`}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change">{s.change}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-title">User Growth — 2024</div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={lineData}>
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 10,
                      fill: "#9ca3af",
                      fontFamily: "DM Mono",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "#9ca3af",
                      fontFamily: "DM Mono",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 11,
                      fontFamily: "DM Mono",
                      color: "#f8f7f4",
                    }}
                    cursor={{ stroke: "#e5e7eb" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#a3e635"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-title">Weekly Visits</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData} barSize={14}>
                  <XAxis
                    dataKey="day"
                    tick={{
                      fontSize: 10,
                      fill: "#9ca3af",
                      fontFamily: "DM Mono",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 11,
                      fontFamily: "DM Mono",
                      color: "#f8f7f4",
                    }}
                    cursor={{ fill: "#f8f7f4" }}
                  />
                  <Bar dataKey="visits" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="table-card">
            <div className="table-header">
              <div className="chart-title" style={{ margin: 0 }}>
                Recent Users
              </div>
              <input
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className="empty-row">
                    <td colSpan={4}>No users found</td>
                  </tr>
                ) : (
                  filtered.map((u) => {
                    const rc = roleColor(u.role);
                    const sc = statusColor(u.status);
                    return (
                      <tr key={u.email}>
                        <td>
                          <div className="user-cell">
                            <div
                              className="user-av"
                              style={{ background: avatarBg(u.name) }}
                            >
                              {avatar(u.name)}
                            </div>
                            <div>
                              <div className="user-name">{u.name}</div>
                              <div className="user-email">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: rc.bg,
                              color: rc.color,
                              borderColor: rc.border,
                            }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: sc.bg,
                              color: sc.color,
                              borderColor: sc.bg,
                            }}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td style={{ color: "#9ca3af" }}>{u.joined}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
