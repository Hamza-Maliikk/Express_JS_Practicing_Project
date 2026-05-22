import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema({
    pdf:{
        type: String,
        required: true
    }}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;