const Blog = require("../models/blog");

// GET - sab blogs fetch karo
const getBlogs = async (req, res) => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err });
  }
};

// POST - naya blog add karo
const AddBlog = async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json("Title, Content aur Category zaroor bharo!");
  }
  try {
    const saved = await Blog.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding blog", error: err });
  }
};

// PUT - blog update karo
const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json("Blog nahi mila!");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err });
  }
};

// DELETE - blog delete karo
const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json("Blog nahi mila!");
    res.json("Blog deleted!");
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err });
  }
};

module.exports = { getBlogs, AddBlog, updateBlog, deleteBlog };