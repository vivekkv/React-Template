import { take, call, put } from 'redux-saga/effects'
import { SUBMIT_LOGIN } from '../constants/login'
import {  onLoginError } from '../actions/login'
import Auth from '../auth'
import { request } from '../utils.js'

export function* submitLogin() { 
    while(true) {
        let { data, openRoute } = yield take(SUBMIT_LOGIN);
        try {
            let validate =  validateFormData(data)
            if(validate.valid) {
                let response = yield call(request, '/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        "mobile": data.mobile.value,
                        "password": data.password.value
                    }),  
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(response.err) {
                    yield put(onLoginError({ valid: false, message: "Mobile or Password is invalid" }))
                } else {
                    Auth.authenticateUser(response.data.token)
                    openRoute("/")
                }
            } else {
                yield put(onLoginError(validate))
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
    } else if(!formData.password || (formData.password && !formData.password.value)) {
        message = "password cannot be empty"
        valid = false
    }
    return {
        valid,
        message
    }
}