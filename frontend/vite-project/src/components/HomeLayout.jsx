import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "../pages/Chatbt";

export default function HomeLayout() {
  return (
    <>
      <style>{`
        .home-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
        }

        .home-layout-main {
          flex: 1;
          padding-top: 60px; /* offset for fixed navbar height */
        }
      `}</style>

      <div className="home-layout">
        <Navbar />
        <main className="home-layout-main">
          <Outlet />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}
