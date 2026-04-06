const Blog = require("../models/blog");
const Category = require("../models/categories");

// GET - sab blogs fetch karo
const getBlogs = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: null,
          blogs: { $push: "$$ROOT" },
          categories: { $addToSet: "$category" } // blogs se hi unique categories nikalo
        }
      },
      {
        $project: {
          _id: 0,
          blogs: 1,
          categories: 1
        }
      }
    ]);

    res.json({
      blogs: result[0]?.blogs || [],
      categories: result[0]?.categories || []
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
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