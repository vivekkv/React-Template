import { LOGIN_REQUEST } from '../constants/login' 

export function loginRequest(username, password) {
    return {
        type: LOGIN_REQUEST,
        username,
        password
    }
}