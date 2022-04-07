require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAuthToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' } );
}

function verifyAuthToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) {
    return res.status(401).send({
      error: "Authorization header is not present",
      code: "ERR_201"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) {
      return res.status(403).send({
        error: "Invalid token",
        code: "ERR_203"
      });
    }
    req.user = user;
    next();
  })
}

module.exports = { generateAuthToken, verifyAuthToken };