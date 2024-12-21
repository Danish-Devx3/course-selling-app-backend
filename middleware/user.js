const { pass } = require("../config");
const { User } = require("../db");
const jwt = require('jsonwebtoken')

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, pass);
    console.log(decoded);
    if (decoded.username) {
      next();
    } else {
      res.status(403).json({
        msg: "user doesnt exist",
      });
    }
}

module.exports = userMiddleware;