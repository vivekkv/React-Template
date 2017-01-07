import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import appReducer from './reducers/app'
import mapReducer from './reducers/map'
import routes from './routes'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root'

const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware];
const devTools = window.devToolsExtension || (() => f=> f);
const enhancers = [applyMiddleware(...middleWares), devTools()];

const store = createStore(combineReducers({
    routing: routerReducer,
    app    : appReducer,
    map    : mapReducer
}), {
    
}, compose(...enhancers))
sagaMiddleware.run(rootSaga)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(<Provider store={store}><Router history={history} routes={routes}></Router></Provider>, document.getElementById('root'))