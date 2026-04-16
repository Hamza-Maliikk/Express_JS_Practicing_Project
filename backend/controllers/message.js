const message = require("../models/message");

// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });



    }};
// Add a new message
const AddMessage = async (req, res) => {
    try {
        const newMessage = new message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

module.exports = { getMessages, AddMessage };
