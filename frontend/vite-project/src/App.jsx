import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Education from "./pages/Education";
import Blogs from "./pages/Blogs";
import Layout from "./components/Layout";
import HomeLayout from "./components/HomeLayout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Work from "./pages/Work";
import HomeBlogs from "./pages/HomeBlogs";
import Details from "./pages/Details";
import Adminhome from "./pages/Adminhome";
import AdminTestimonials from "./pages/Admintestmonials";

function App() {
  return (
    <Routes>
      {/* Public pages — all share Navbar + Footer via HomeLayout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<HomeBlogs />} />
      </Route>

      {/* Auth pages — no shared layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin / dashboard pages — sidebar layout */}
      <Route element={<Layout />}>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/education" element={<Education />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/work" element={<Work />} />
        <Route path="/testimonials" element={<AdminTestimonials />} />
        <Route path="/details" element={<Details />} />
        <Route path="/admin" element={<Adminhome />} />
      </Route>
    </Routes>
  );
}

export default App;
