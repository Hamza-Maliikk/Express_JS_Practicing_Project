const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,dasdas
    enum: ["User", "Admin", "Editor"],
    default: "User"          // ← yeh ADD kiya
  }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;