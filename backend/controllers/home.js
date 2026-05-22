import Home from "../models/home.js";

// GET - home fetch karo
const getHome = async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST - image Cloudinary se aayegi
const AddHome = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";

    const newHome = new Home({
      ...req.body,
      image: imageUrl,
    });

    const savedHome = await newHome.save();
    res.status(200).json(savedHome);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT - agar nai image upload ho to update karo, warna purani rakho
const UpdateHome = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedHome);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE - home delete karo
const deleteHome = async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.status(200).json("Home deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getHome, AddHome, UpdateHome, deleteHome };