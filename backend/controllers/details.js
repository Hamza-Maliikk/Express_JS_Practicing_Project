const Details = require("../models/details");

const getDetails = async (req, res) => {
    try {
        const details = await Details.find();
        res.json(details);
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
};

const AddDetails = async (req, res) => {
    const { name, role, email, phone, location } = req.body;    
    try {
        const newDetails = new Details({ name, role, email, phone, location });
        await newDetails.save();
        res.status(201).json(newDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const UpdateDetails = async (req, res) => {
    const { id } = req.params;
    const { name, role, email, phone, location } = req.body;    
    try {
        const updatedDetails = await Details.findByIdAndUpdate(id, { name, role, email, phone, location }, { new: true });
        if (!updatedDetails) {
            return res.status(404).json({ message: "Details not found" });
        }       res.json(updatedDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDetails = await Details.findByIdAndDelete(id);
        if (!deletedDetails) {
            return res.status(404).json({ message: "Details not found" });
        }
        res.json({ message: "Details deleted successfully" });
    }   catch (error) { 
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getDetails,
    AddDetails,
    UpdateDetails,
    deleteDetails
}