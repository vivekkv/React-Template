import { fork, take } from 'redux-saga/effects'
import { fetchAvilableDirvers } from './map'

export default function* root() {
    yield fork(fetchAvilableDirvers)
}