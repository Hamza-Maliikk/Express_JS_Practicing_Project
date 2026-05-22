import mongoose from "mongoose";
const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
}, { timestamps: true });   

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;