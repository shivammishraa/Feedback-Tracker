const jwt = require("jsonwebtoken");
const constant = require("../constants/feedback.constant");
function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Invalid Login, please login again" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, constant.HASH_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authorize;