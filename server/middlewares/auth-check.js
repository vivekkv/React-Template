const jwt = require('jsonwebtoken');
const config = require('../common/config');
const _ = require("lodash")
const users = require("../db/testData/users")

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {

    if (err) { return res.status(401).end(); }

      const userId = decoded.sub;
      const userInfo = _.find(users, (d) => { return d.id == userId })

      if(userInfo) {
          return next();
      } else {
        return res.status(401).end();
      }
  });
};