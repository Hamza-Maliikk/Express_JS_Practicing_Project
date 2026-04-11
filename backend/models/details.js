const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  }},{ timestamps: true });

const Details = mongoose.model("details", detailSchema);

module.exports = Details;