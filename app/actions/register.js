import { INPUT_CHANGED, NEW_ACCOUNT_REGISTER, REGISTER_ERRORS } from '../constants/register'

export function inputChanged(name, value) {
    return {
        type: INPUT_CHANGED,
        name,
        value
    }
}

export function addNewAccount(data, openRoute) {
    return {
        type: NEW_ACCOUNT_REGISTER,
        data,
        openRoute
    }
}

export function onError(errors) {
    return {
        type: REGISTER_ERRORS,
        errors
    }
}