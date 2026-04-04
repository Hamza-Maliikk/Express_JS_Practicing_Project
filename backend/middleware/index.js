const jwt = require("jsonwebtoken");
const { secret } = require("../controllers/user");

const authChecker = async (req, res, next) => {
  try {
    console.log("authChecker called", secret);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received in authChecker:", token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "server error" });
  }
};

module.exports = {
  authChecker,
};
