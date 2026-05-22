import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "Other",
    },
    image: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);