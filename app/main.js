import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers'
import routes from './routes'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware];
const devTools = window.devToolsExtension || (() => f=> f);
const enhancers = [applyMiddleware(...middleWares), devTools()];

const store = createStore(combineReducers({
    routing: routerReducer,
    app: reducers
}), {  
    
}, compose(...enhancers))
sagaMiddleware.run(rootSaga) 
const history = syncHistoryWithStore(hashHistory, store)
ReactDOM.render(<Provider store={store}><Router history={history} routes={routes}></Router></Provider>, document.getElementById('root'))