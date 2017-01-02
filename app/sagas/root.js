import {take, call, put, fork, race} from 'redux-saga/effects'
import { LOGIN_REQUEST } from '../constants/login'

export function* helloSaga() {
  console.log('Hello Sagas!')
}