import About from "../models/about.js";

// GET - About fetch karo
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - About add karo
export const AddAbout = async (req, res) => {
  try {
    const { intro, skills } = req.body; // ✅ skills bhi lo

    const existing = await About.findOne();
    if (existing) {
      return res.status(400).json({ message: "About already exists, use PUT to update" });
    }

    const newAbout = new About({ 
      intro, 
      skills: skills || [] // ✅ skills save karo, na ho to empty array
    });
    await newAbout.save();

    res.status(201).json({ message: "About added successfully", data: newAbout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - About update karo
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { intro, skills } = req.body; // ✅ skills bhi lo

    const updated = await About.findByIdAndUpdate(
      id,
      { intro, skills }, // ✅ dono update karo
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "About not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Ek skill remove karo
export const deleteSkill = async (req, res) => {
  try {
    const { skill } = req.params; // skill name URL se lenge

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }

    // skill filter karke hata do
    about.skills = about.skills.filter((s) => s !== skill);
    await about.save();

    res.status(200).json({ message: "Skill deleted successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};