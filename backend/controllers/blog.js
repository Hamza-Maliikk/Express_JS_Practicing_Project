const Blog = require("../models/blog");
const Category = require("../models/categories");

const normalizeCategoryName = (value = "") => value.trim().replace(/\s+/g, " ");

// GET - sab blogs fetch karo
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const dbCategories = await Category.find().select("category -_id");
    const uniqueCategories = [
      ...new Set(
        dbCategories
          .map((c) => normalizeCategoryName(c.category))
          .filter(Boolean)
          .map((c) => c.toLowerCase())
      ),
    ].map((lower) => {
      const original = dbCategories.find(
        (c) => normalizeCategoryName(c.category).toLowerCase() === lower
      );
      return normalizeCategoryName(original?.category || lower);
    });

    res.json({
      blogs,
      categories: uniqueCategories,
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// POST - naya blog add karo
const AddBlog = async (req, res) => {
  const title = req.body?.title?.trim();
  const content = req.body?.content?.trim();
  const category = normalizeCategoryName(req.body?.category || "");
  if (!title || !content || !category) {
    return res.status(400).json("Title, Content aur Category zaroor bharo!");
  }
  try {
    const saved = await Blog.create({ ...req.body, title, content, category });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding blog", error: err.message });
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