const API_BASE = 'http://localhost:5000/api';
const About = () => {


  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans text-gray-800">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Our Story</h1>
        <p className="text-lg text-gray-600 italic">
          "Building the future, one line of code at a time."
        </p>
      </header>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-indigo-100 pb-2">
          Who We Are
        </h2>
        <p className="leading-relaxed mb-4">
          Welcome to <span className="font-bold">[Company Name]</span>. Founded in 2026, we began 
          with a simple goal: to bridge the gap between complex technology and human-centric 
          design. We believe that digital tools should empower people, not overwhelm them.
        </p>
      </section>

      {/* Values Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-indigo-700 mb-2">Innovation</h3>
          <p className="text-sm">We don't just follow trends; we aim to set them by staying curious.</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-indigo-700 mb-2">Integrity</h3>
          <p className="text-sm">Transparency is our default setting. We value your trust above all else.</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-indigo-700 mb-2">Community</h3>
          <p className="text-sm">Built for users, by users. Your feedback is the engine that drives us.</p>
        </div>
      </section>

      {/* Philosophy Section (With a bit of math flavor) */}
      <section className="bg-gray-900 text-white p-8 rounded-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Our Philosophy</h2>
        <p className="mb-4">
          We treat every project like an equation where the solution must be elegant and efficient. 
          Our success is calculated by a simple formula:
        </p>
        <div className="text-center py-4 bg-gray-800 rounded-md">
          <code className="text-indigo-400 text-xl">
            Success = (User Experience + Reliability) \times Creativity
          </code>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="text-center">
        <p className="mb-6">Want to learn more about what we do?</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-8 rounded-full transition duration-300">
          Get In Touch
        </button>
      </footer>
    </div>
  );
};

export default About;