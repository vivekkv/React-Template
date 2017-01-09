import { INPUT_CHANGED, SUBMIT_LOGIN, LOGIN_ERRORS } from '../constants/login'

export function inputChanged(name, value) {
    return {
        type: INPUT_CHANGED,
        name,
        value 
    }
}

export function submitLogin(data, openRoute) {
    return {
        type: SUBMIT_LOGIN,
        data,
        openRoute
    }
}

export function onLoginError(errors) {
    return {
        type: LOGIN_ERRORS,
        errors
    }
}