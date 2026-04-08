import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Education from "./pages/Education";
import Blogs from "./pages/Blogs";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/education" element={<Education />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  );
}

export default App;
