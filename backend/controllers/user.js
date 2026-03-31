const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/user");


const userData = async (req, res) => {
  try {
    const Allusers = await User.find();
    const formattedUsers = Allusers.map((user) => ({
      _id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role || "User",
    }));
    return res.status(200).json(formattedUsers);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json("Naam aur email zaroori hain");
  }

  const parts = name.trim().split(" ");
  const first_name = parts[0];
  const last_name = parts.slice(1).join(" ") || "-";

  try {
    const user = await User.create({ first_name, last_name, email, role });

    return res.status(201).json({
      // 201 = Created
      _id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role || "User",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json("User deleted successfully");
  } catch (err) {
    return res.status(400).json("Error deleting user");
  }
};

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password} =
      req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({message: "Email already exists"});
    }
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    return res.status(201).json({
      _id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role || "User",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
module.exports = {
  userData,
  addUser,
  deleteUser,
  registerUser,
};
