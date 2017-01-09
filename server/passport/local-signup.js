const PassportLocalStrategy = require('passport-local').Strategy;
const users = require("../db/testData/users")
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'mobile',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, mobile, password, done) => {
  users.insert({
      mobile,
      password
  })
  return done(null)
});
