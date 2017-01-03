import { fork } from 'redux-saga/effects'
import { fetchAvilableDirvers } from './map'
import { take } from 'redux-saga/effects'

function* testData() {
    while(true) {
        yield take("DONE")
    }
}

export default function* root() {
    yield fork(testData)
    yield fork(fetchAvilableDirvers)
}