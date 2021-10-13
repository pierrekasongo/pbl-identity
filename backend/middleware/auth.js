const jwt = require("jsonwebtoken");
const conf = require('../config/conf.json')

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Authentification requise pour accèder à cette ressource.");
  }
  try {
    const decoded = jwt.verify(token, conf.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Ticket invalide");
  }
  return next();
};

module.exports = verifyToken;