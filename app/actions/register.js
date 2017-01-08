import { INPUT_CHANGED, SUBMIT_LOGIN } from '../constants/register'

export function inputChanged(name, value) {
    return {
        type: INPUT_CHANGED,
        name,
        value
    }
}

export function submitLogin(formData, openRoute) {
    return {
        type: SUBMIT_LOGIN,
        formData,
        openRoute
    }
}