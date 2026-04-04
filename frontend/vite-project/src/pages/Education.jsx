import { useState, useEffect } from "react";
import axios from "axios";

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({ degree: "", institute: "", year: "", grade: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all


  const fetchEducation = async () => {
    const res = await axios.get("http://localhost:8000/api/education");
    setEducations(res.data);
  };
  useEffect(() => {
    fetchEducation();
  }, []);
  // Add or Update
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:8000/api/education/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:8000/api/education", form);
    }
    setForm({ degree: "", institute: "", year: "", grade: "" });
    fetchEducation();
  };

  // Edit
  const handleEdit = (edu) => {
    setForm({ degree: edu.degree, institute: edu.institute, year: edu.year, grade: edu.grade });
    setEditId(edu._id);
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/education/${id}`);
    fetchEducation();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
        .edu-page { max-width: 800px; font-family: 'DM Mono', monospace; color: #1a1a1a; }
        .edu-page h2 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 1.5rem;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }
      `}</style>
      <div className="edu-page">
      <h2>Education</h2>

      {/* Form */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          placeholder="Degree"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Institute"
          value={form.institute}
          onChange={(e) => setForm({ ...form, institute: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleSubmit} style={btnStyle}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* List */}
      {educations.map((edu) => (
        <div key={edu._id} style={cardStyle}>
          <div>
            <h3 style={{ margin: 0 }}>{edu.degree}</h3>
            <p style={{ margin: "4px 0", color: "#666" }}>{edu.institute}</p>
            <small>{edu.year} • {edu.grade}</small>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => handleEdit(edu)} style={editBtn}>Edit</button>
            <button onClick={() => handleDelete(edu._id)} style={deleteBtn}>Delete</button>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

// Styles
const inputStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btnStyle = {
  padding: "8px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const editBtn = {
  padding: "6px 14px",
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "6px 14px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #eee",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

export default Education;