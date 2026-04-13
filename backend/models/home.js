const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true  
    },
    headline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });   

const Home = mongoose.model('home', homeSchema);

module.exports = Home;