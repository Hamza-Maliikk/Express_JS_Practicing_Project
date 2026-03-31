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
    const { first_name, last_name, email, password, role} =
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
      role,
    });
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {   
        return res.status(500).json({ error: "Error hashing password" });
      } else {
        user.password = hash;
        user.save();
      }});
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Email aur password zaroori hain");
    } 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return res.status(500).json({ error: "Error comparing passwords" });    
      } else if (result) {
        return res.status(200).json({
          _id: user._id,
          email: user.email,
          role: user.role || "User",
        });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
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
  loginUser
};
