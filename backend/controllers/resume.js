const Resume = require('../models/resume')

const getResume = (req, res) =>{
    Resume.find().then((resume) => res.json(resume))
    .catch((err) => res.status(500).json(err))  

}
const addResume = (req, res) => {
    const newResume = new Resume({
        pdf: req.file ? req.file.path : null
    })
    newResume.save().then((resume) => res.json(resume))
    .catch((err) => res.status(500).json(err)) 
}

const updateResume = (req, res) => {
    Resume.findByIdAndUpdate(req.params.id, {
        pdf: req.file ? req.file.path : null
    }, {new: true}).then((resume) => res.json(resume))
    .catch((err) => res.status(500).json(err))
}
const deleteResume = (req, res) => {
    Resume.findByIdAndDelete(req.params.id).then(() => res.json("Resume deleted"))
    .catch((err) => res.status(500).json(err))
}   
module.exports = {getResume, addResume, updateResume, deleteResume}