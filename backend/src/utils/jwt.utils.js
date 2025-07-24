const jwt = require("jsonwebtoken");
const constant = require("../constants/feedback.constant");


function createToken(loggedInUserData) {
  const payload = { userId: loggedInUserData?.uuid };
  const secretKey = constant.HASH_KEY;
  const token = jwt.sign(payload, secretKey);
  return token;
}

module.exports={createToken}