import { useState, useEffect } from "react";

const API_BASE = 'http://localhost:8000/api/about';

const getAbout = async () => {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about:", error);
    throw error;
  }
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ DB se data fetch karo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbout();
        setAboutData(data);
      } catch (err) {
        setError("Failed to load data.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)   return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans text-[var(--text)] bg-[var(--bg)]">

      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-indigo-500">Our Story</h1>
        {/* ✅ DB se intro show hoga */}
        <p className="text-lg text-[var(--text)] italic opacity-80">
          {aboutData?.intro || '"Building the future, one line of code at a time."'}
        </p>
      </header>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-[var(--border)] pb-2 transition-colors">
          Who We Are
        </h2>
        {/* ✅ DB se intro paragraph bhi show hoga */}
        <p className="leading-relaxed mb-4 text-[var(--text)]">
          {aboutData?.intro
            ? aboutData.intro
            : <>
                Welcome to <span className="font-bold">[Company Name]</span>. Founded in 2026, we began
                with a simple goal: to bridge the gap between complex technology and human-centric
                design. We believe that digital tools should empower people, not overwhelm them.
              </>
          }
        </p>
      </section>

      {/* Values Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-indigo-900/10 p-6 rounded-lg shadow-sm border border-indigo-500/20">
          <h3 className="font-bold text-indigo-400 mb-2">Innovation</h3>
          <p className="text-sm opacity-90">We don't just follow trends; we aim to set them by staying curious.</p>
        </div>
        <div className="bg-indigo-900/10 p-6 rounded-lg shadow-sm border border-indigo-500/20">
          <h3 className="font-bold text-indigo-400 mb-2">Integrity</h3>
          <p className="text-sm opacity-90">Transparency is our default setting. We value your trust above all else.</p>
        </div>
        <div className="bg-indigo-900/10 p-6 rounded-lg shadow-sm border border-indigo-500/20">
          <h3 className="font-bold text-indigo-400 mb-2">Community</h3>
          <p className="text-sm opacity-90">Built for users, by users. Your feedback is the engine that drives us.</p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-indigo-950 text-white p-8 rounded-2xl mb-12 border border-indigo-500/30">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Our Philosophy</h2>
        <p className="mb-4 text-indigo-100/80">
          We treat every project like an equation where the solution must be elegant and efficient.
          Our success is calculated by a simple formula:
        </p>
        <div className="text-center py-4 bg-indigo-900/40 rounded-md border border-indigo-500/20">
          <code className="text-indigo-300 text-xl">
            Success = (User Experience + Reliability) × Creativity
          </code>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="text-center">
        <p className="mb-6 opacity-80">Want to learn more about what we do?</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-8 rounded-full transition duration-300 shadow-lg shadow-indigo-500/20">
          Get In Touch
        </button>
      </footer>
    </div>
  );
};

export default About;