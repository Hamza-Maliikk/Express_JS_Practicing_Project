const Project = require("../models/work");

// GET all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - add project
const AddProject = async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;
    const newProject = new Project({ title, description, technologies, link });
    const savedProject = await newProject.save();
    res.status(201).json({ message: "Project added successfully", data: savedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - update project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, link } = req.body; // technologies bhi include kiya

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, technologies, link },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, AddProject, updateProject, deleteProject };