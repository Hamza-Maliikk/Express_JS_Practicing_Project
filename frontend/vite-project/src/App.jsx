import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import Blogs from "./pages/Blogs";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/education" element={<Education />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>
    </Routes>
  );
}

export default App;
