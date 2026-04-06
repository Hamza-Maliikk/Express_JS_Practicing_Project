const Category = require("../models/categories");

// GET - sab fetch karo 
const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }};

// POST - naya category add karo
const AddCategory = async (req, res) => {
  const { category } = req.body;
    if (!category) {
        return res.status(400).json("Category field is required!");
    }
    try {
        const saved = await Category.create(req.body);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: "Error adding category", error: err });
    }};

// PUT - category update karo
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
        req.body,
        { new: true }
    );
    if (!updated) return res.status(404).json("Category nahi mila!");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err });
  }};

// DELETE - category delete karo
const deleteCategory = async (req, res) => {
  try { 
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json("Category nahi mila!");
    res.json("Category deleted!");
  } catch (err) {       
    res.status(500).json({ message: "Error deleting category", error: err });
  }};

module.exports = { getCategories, AddCategory, updateCategory, deleteCategory };