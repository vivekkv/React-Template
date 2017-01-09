const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/login', (req, res, next) => {

  const validationResult = validateLoginData(req.body)

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {

    if (err) {

      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }
 
  return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        })
  })(req, res, next)
})

router.post("/signup", function(req, res, next) {
  
  const validationResult = validateSignUpData(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    } 

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });

  })(req, res, next);
})

function validateSignUpData(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || !payload.mobile || payload.mobile.trim().length === 0) {

    isFormValid = false
    errors.mobile = 'Please provide your mobile number.'
  } else if(!(/^\d{10}$/.test(payload.mobile))) {

    isFormValid = false
    errors.mobile = 'Invalid mobile number.'
  }

  if (!payload || !payload.password || payload.password.trim().length === 0) {

    isFormValid = false;
    errors.password = 'Please provide your password.'
  } else if(!payload.confirmPassword || payload.confirmPassword.trim().length == 0) {

    isFormValid = false;
    errors.confirmPassword = "Please provide confirm password"
  }  else if(payload.password != payload.confirmPassword) {

    isFormValid = false;
    errors.confirmPassword = "Confirm Password is not matching"
  }
  
  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }  
}

function validateLoginData(payload) {

  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || !payload.mobile || payload.mobile.trim().length === 0) {

    isFormValid = false
    errors.mobile = 'Please provide your mobile number.'
  } else if(!(/^\d{10}$/.test(payload.mobile))) {

    isFormValid = false
    errors.mobile = 'Invalid mobile number.'
  }

  if (!payload || !payload.password || payload.password.trim().length === 0) {

    isFormValid = false;
    errors.password = 'Please provide your password.'
  }
  
  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

module.exports = router