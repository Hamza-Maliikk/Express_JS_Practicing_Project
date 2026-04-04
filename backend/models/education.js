const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true
  }},{ timestamps: true });

const Education = mongoose.model("education", userSchema);

module.exports = Education;