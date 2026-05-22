import mongoose from "mongoose";
const keySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    }
});

export default mongoose.model("Key", keySchema)
