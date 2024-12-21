const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const { pass } = require("../config");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const decoded = await jwt.verify(token, pass);
  console.log(decoded);
  if (decoded.username) {
    next();
  } else {
    res.status(403).json({
      msg: "Admin doesnt exist",
    });
  }
}

module.exports = adminMiddleware;
