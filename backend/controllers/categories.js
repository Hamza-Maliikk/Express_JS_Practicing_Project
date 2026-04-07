const Category = require("../models/categories");
const Blog = require("../models/blog");

const normalizeCategoryName = (value = "") => value.trim().replace(/\s+/g, " ");

// GET - sab fetch karo 
const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find().sort({ createdAt: -1 });
    const uniqueMap = new Map();

    for (const item of allCategories) {
      const normalized = normalizeCategoryName(item.category).toLowerCase();
      if (!normalized) continue;

      if (!uniqueMap.has(normalized)) {
        uniqueMap.set(normalized, {
          ...item.toObject(),
          category: normalizeCategoryName(item.category),
        });
      }
    }

    const categories = await Promise.all(
      [...uniqueMap.values()].map(async (cat) => {
        const escaped = cat.category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const blogCount = await Blog.countDocuments({
          category: { $regex: `^${escaped}$`, $options: "i" },
        });
        return { ...cat, blogCount };
      })
    );

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// POST - naya category add karo
const AddCategory = async (req, res) => {
  const category = normalizeCategoryName(req.body?.category);
  const description = (req.body?.description || "").trim();

  if (!category) {
    return res.status(400).json("Category field is required!");
  }
  if (!description) {
    return res.status(400).json("Description field is required!");
  }

  try {
    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exists = await Category.findOne({
      category: { $regex: `^${escaped}$`, $options: "i" },
    });
    if (exists) {
      return res.status(409).json("Category already exists!");
    }

    const saved = await Category.create({ category, description });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding category", error: err.message });
  }
};

// PUT - category update karo
const updateCategory = async (req, res) => {
  try {
    const category = normalizeCategoryName(req.body?.category);
    const description = (req.body?.description || "").trim();
    if (!category || !description) {
      return res.status(400).json("Category and description are required!");
    }

    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const conflict = await Category.findOne({
      _id: { $ne: req.params.id },
      category: { $regex: `^${escaped}$`, $options: "i" },
    });
    if (conflict) {
      return res.status(409).json("Category already exists!");
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { category, description },
      { new: true }
    );
    if (!updated) return res.status(404).json("Category nahi mila!");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err.message });
  }
};

// DELETE - category delete karo
const deleteCategory = async (req, res) => {
  try { 
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json("Category nahi mila!");
    res.json("Category deleted!");
  } catch (err) {       
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};

module.exports = { getCategories, AddCategory, updateCategory, deleteCategory };