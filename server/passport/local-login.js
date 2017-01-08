const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../common/config')
const users = require('../db/testData/users')
const _ = require("lodash")

module.exports = new PassportLocalStrategy({

    usernameField: 'mobile',
    passwordField: 'password',
    session: false,
    passReqToCallback: true

}, (req, mobile, password, done) => {

    const userData = {
        mobile: mobile.trim(),
        password: password.trim()
    };
    const user = _.find(users, (u) => {
        return u.mobile == mobile
    })
    if (user) {
        
        if (userData.password == user.password) {
            const payload = {
                sub: user.id
            };
            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };
            return done(null, token, data);
        } else {

            const error = new Error('Incorrect mobile number or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
    } else {

        const error = new Error('Incorrect mobile number or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
    }
});