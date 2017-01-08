import { take, call } from 'redux-saga/effects'
import { SUBMIT_LOGIN } from '../constants/login'
import Auth from '../auth'
import { request } from '../utils.js'

export function* submitLogin() {
    while(true) {
        var { loginData, openRoute } = yield take(SUBMIT_LOGIN);
        try {
            if(validateFormData(loginData)) {
                var response = yield call(request, '/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        "mobile": loginData.mobile.value,
                        "password": loginData.password.value
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(response.err) {
                    alert("login failed")
                } else {
                    Auth.authenticateUser(response.data.token)
                    openRoute("/")
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

function validateFormData(formData) {
    if(!formData.mobile && !formData.password) {
        alert("mobile and password cannot be blank")
        return false;
    } else if(!formData.mobile || (formData.mobile && !formData.mobile.value)) {
        alert("mobile number cannot be blank")
        return false;
    } else if(!formData.password || (formData.password && !formData.password.value)) {
        alert("password cannot be blank")
        return false;
    }
    return true;
}