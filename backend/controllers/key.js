const Key = require("../models/key");

// Add a new key    
const Addkey = async (req, res) => {
    try {
        const { apiKey } = req.body;
        const newKey = new Key({ key: apiKey });
        await newKey.save();
        res.status(201).json(newKey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch the latest key 
const fetchKey = async (req, res) => {
    try {
        const key = await Key.findOne().sort({ _id: -1 }); // Latest key
        if (!key) {
            return res.status(404).json({ error: "API Key not found" });
        }
        res.status(200).json({ apiKey: key.key });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { Addkey, fetchKey };  