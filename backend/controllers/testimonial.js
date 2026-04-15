const Testmonials = require("../models/testimonials")

// get testimonials     
 const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testmonials.find();
        res.status(200).json(testimonials);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// add testimonial
const AddTestimonial = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const testimonial = new Testmonials({
            name: req.body.name,
            username: req.body.username,
            description: req.body.description,
            image: req.file ? req.file.path : null
        });
        await testimonial.save();
        res.status(201).json({ message: "Testimonial added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message }); // will now show real error
    }
};

// update testimonial
 const UpdateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testmonials.findById(req.params.id);  
        if (!testimonial) {
            return res.status(404).json("Testimonial not found");
        }   
        testimonial.name = req.body.name || testimonial.name;
        testimonial.username = req.body.username || testimonial.username;
        testimonial.description = req.body.description || testimonial.description;  
        if (req.file) {
            testimonial.image = req.file.path; // Changed from req.file.filename
        }
        await testimonial.save();
        res.status(200).json("Testimonial updated successfully");
    }catch (err) {
        res.status(500).json(err);
    }
}

// delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testmonials.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json("Testimonial not found");
        }
        res.status(200).json("Testimonial deleted successfully");
    }catch (err) {
        res.status(500).json(err);
    }
}   

module.exports = { getTestimonials, AddTestimonial, UpdateTestimonial, deleteTestimonial };