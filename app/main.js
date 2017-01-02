import React from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers/app'
import routes from './routes'
import { getUserLocationInfo } from './utils/location'
import { updateUserLocation } from './actions'
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './sagas/root'

const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware];
const devTools = window.devToolsExtension || (() => f=> f);
const enhancers = [applyMiddleware(...middleWares), devTools()];

const store = createStore(combineReducers({
    routing: routerReducer,
    app    : reducers
}), {
    
}, compose(...enhancers))
sagaMiddleware.run(helloSaga);

const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(<Provider store={store}><Router history={history} routes={routes}></Router></Provider>, document.getElementById('root'))
getUserLocationInfo((position) => {
    store.dispatch(updateUserLocation(position));
});