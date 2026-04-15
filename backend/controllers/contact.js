const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

// Get all contact messages
const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new contact message
const AddContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "hamzamalik123450@gmail.com",
      to: email,
      subject: "New Contact Form Message",
      text: `Name: ${name}\nMessage: ${message} THANKYOU FOR CONTACTING ME! I WILL GET BACK TO YOU SOON!`,
    });
    res.status(201).json({ message: "Email sent successfully", contact: newContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContact,
  AddContact,
};
