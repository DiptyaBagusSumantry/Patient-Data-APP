const Models = require("../models/index.js");
const Users = Models.User;

const jwt = require("jsonwebtoken");

async function IsAdmin(req, res, next) {
  try {
     const authHeader = req.headers["authorization"];
     const token = authHeader && authHeader.split(" ")[1];

    const user = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) return res.sendStatus(403);
        return decoded;
      }
    );

    if (user.role !== "admin") {
      return res.status(403).json({ msg: `Your role is not allowed!` });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ msg: `roleChecker:\n ${error.message}` });
  }
}

module.exports = { IsAdmin };
