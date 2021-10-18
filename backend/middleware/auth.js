const jwt = require("jsonwebtoken");
const conf = require('../config/conf')

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Authentification requise pour accèder à cette ressource.");
  }
  try {
    const _token = token.split(" ")[1]
    const decoded = jwt.verify(_token, conf.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log("Ticket error ", err.message)
    return res.status(401).json({"error":"Ticket invalide"});
  }
  return next();
};

module.exports = verifyToken;