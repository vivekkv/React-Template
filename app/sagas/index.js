import { fork, take } from 'redux-saga/effects'
import { submitLogin } from './login'
import { addNewAccount } from './register'

export default function* root() {
    yield fork(submitLogin)
    yield fork(addNewAccount)
}