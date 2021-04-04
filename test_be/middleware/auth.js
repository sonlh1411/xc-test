const jwt = require("jsonwebtoken");
const userDb = require("../database/auth");

const authToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Token not found");
  }
  jwt.verify(token.split(" ")[1], "My_Secret_Key", async (err, data) => {
    if (err) return res.status(401).send("Invalid token");
    try {
      const user = await userDb.findUserById(data.id);
      if (!user) return res.status(401).send("User not found");
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send(e.message);
    }
  });
};

module.exports = authToken;
