import { take, call, put } from 'redux-saga/effects'
import { NEW_ACCOUNT_REGISTER } from '../constants/register'
import { submitLogin } from '../actions/login'
import {  onError } from '../actions/register'
import Auth from '../auth'
import { request } from '../utils.js'
 
export function* addNewAccount() { 
    while(true) {
        let { data, openRoute } = yield take(NEW_ACCOUNT_REGISTER);
        try {
            let validate =  validateFormData(data)
            if(validate.valid) {
                let response = yield call(request, '/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                        "mobile": data.mobile.value,
                        "password": data.password.value,
                        "confirmPassword": data.confirmPassword.value
                    }),  
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(response.err) {
                    yield put(onError({ valid: false, message: "Registration failed" }))
                } else {
                   yield put(submitLogin(data, openRoute))
                }
            } else {
                yield put(onError(validate))
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

function validateFormData(formData) {
    var message = "";
    var valid   = true;
    if(!formData.mobile && !formData.password) {
        message = "mobile and password cannot be empty"
        valid = false
    } else if(!formData.mobile || (formData.mobile && !formData.mobile.value)) {
        message = "mobile number cannot be empty"
        valid = false
    } else if(!(/^\d{10}$/.test(formData.mobile.value))) {
        message = "mobile number is not valid"
        valid = false
    } else if(!formData.password || (formData.password && !formData.password.value)) {
        message = "password cannot be empty"
        valid = false
    } else if((formData.confirmPassword && formData.confirmPassword.value) && formData.password.value != formData.confirmPassword.value) {
        message = "confirmPassword password is not matching"
        valid = false
    } else if(!formData.confirmPassword || !formData.confirmPassword.value) {
        message = "confirm password cannot be empty"
        valid = false
    }
    return {
        valid,
        message
    }
}