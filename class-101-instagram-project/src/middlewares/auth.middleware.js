const jwt = require("jsonwebtoken"); //103-> to verify img kisne bheji hai throught tokens

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      messgae: "Token not provided, Unauthorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      mesasge: "user not authorized",
    });
  }

  req.user = decoded;
}

module.exports = identifyUser;
