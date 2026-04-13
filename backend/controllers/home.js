const Home = require("../models/home")

// get home
const getHome = async (req, res) => {
    try {
        const home = await Home.find()
        res.status(200).json(home)
    }
    catch (err) {
        res.status(500).json(err)
    }   
}
// ADD — image Cloudinary se aayegi
const AddHome = async (req, res) => {
  try {
    // req.file.path = Cloudinary ka secure URL (multer-storage-cloudinary deta hai)
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

// update home
// UPDATE — agar nai image upload ho to update karo, warna purani rakho
const UpdateHome = async (req, res) => {
  try {
    const updateData = { ...req.body };
 
    if (req.file) {
      updateData.image = req.file.path; // nai Cloudinary URL
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

// delete home
const deleteHome = async (req, res) => {
    try {
        await Home.findByIdAndDelete(req.params.id)
        res.status(200).json("Home deleted successfully")
    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { getHome, AddHome, UpdateHome, deleteHome }