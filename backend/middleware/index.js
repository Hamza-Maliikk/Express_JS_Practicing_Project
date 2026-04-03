const jwt = require("jsonwebtoken");
const { secret } = require("../controllers/user");

const authChecker = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        } 
        const decoded = jwt.verify(token, secret);
        req.user = docoded; 
        next();
      }catch(error){
        return res.status(401).json({ error: "Unauthorized" });
      }}

module.exports = {
    authChecker
}       

