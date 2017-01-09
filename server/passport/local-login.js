const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../common/config')
const dbUser = require('../db/testData/users')
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
    
    const objUser = _.find(dbUser.getUsers(), (u) => {
        return u.mobile == mobile
    })

    if (objUser) {
        
        if (userData.password == objUser.password) {

            const payload = {
                sub: objUser.id
            };

            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: objUser.name
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