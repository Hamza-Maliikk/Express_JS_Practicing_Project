const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    message: { type: String, required: true },
    file: {
      name: String,
      url: String,
      type: String,
    },
  },
  { timestamps: true }
);

const Message =  mongoose.model("Message", messageSchema);
module.exports = Message;
