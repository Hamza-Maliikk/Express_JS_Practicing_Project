import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    intro: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About; 