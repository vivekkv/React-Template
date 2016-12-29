import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers/app'
import routes from './routes'
import { getUserLocationInfo } from './utils/location'
import { updateUserLocation } from './actions'

const store = createStore(combineReducers({
    routing: routerReducer,
    app    : reducers
}), {
    
}, compose(window.devToolsExtension ? window.devToolsExtension() : f => f ))

getUserLocationInfo((position) => {
    const history = syncHistoryWithStore(browserHistory, store)
    ReactDOM.render(<Provider store={store}><Router history={history} routes={routes}></Router></Provider>, document.getElementById('root'))
    store.dispatch(updateUserLocation(position));
});