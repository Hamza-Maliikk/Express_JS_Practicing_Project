const Education = require("../models/education");

// GET - sab fetch karo
const getEducation = async (req, res) => {
  try {
    const data = await Education.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST - add karo
const AddEducation = async (req, res) => {
  const { degree, institute, year, grade } = req.body;
  if (!degree || !institute || !year || !grade) {
    return res.status(400).json("All fields are required");
  }
  try {
    const saved = await Education.create({ degree, institute, year, grade });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding education", error: err });
  }
};


// PUT - edit karo
const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE - delete karo
const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json("Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getEducation, AddEducation, updateEducation, deleteEducation };