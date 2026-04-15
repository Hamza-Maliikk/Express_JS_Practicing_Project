const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    pdf:{
        type: String,
        required: true
    }}, { timestamps: true });

const Resume = mongoose.model('resume', resumeSchema);
module.exports = Resume;