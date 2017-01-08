import { fork, take } from 'redux-saga/effects'
import { submitLogin } from './login'

export default function* root() {
    yield fork(submitLogin)
}