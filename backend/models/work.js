const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, default: "" },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);