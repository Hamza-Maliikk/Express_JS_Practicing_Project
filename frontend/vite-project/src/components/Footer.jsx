import { NavLink } from "react-router-dom";

const FOOTER_LINKS = ["Home", "About", "Project", "Skills", "Contact"];
const SOCIAL_LINKS = ["LinkedIn", "GitHub", "Instagram", "Twitter"];

const ROUTE_MAP = {
  Home: "/",
  About: "/about",
  Project: "/projects",
  Skills: "/skills",
  Contact: "/contact",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .hn-footer {
          border-top: 0.5px solid #e8e4de;
          padding: 22px 48px;
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hn-footer-copy {
          font-size: 12px;
          color: #aaa;
        }

        .hn-footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .hn-footer-link {
          font-size: 12px;
          color: #999;
          text-decoration: none;
          transition: color 0.2s;
        }

        .hn-footer-link:hover {
          color: #111;
        }

        @media (max-width: 600px) {
          .hn-footer {
            padding: 18px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="hn-footer">
        <span className="hn-footer-copy">
          © {year} My Portfolio. All rights reserved.
        </span>

        <div className="hn-footer-links">
          {SOCIAL_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="hn-footer-link"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
