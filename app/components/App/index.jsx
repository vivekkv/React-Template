import React from 'react'
import { connect } from 'react-redux'
import { getAvilableDrivers } from '../../actions/map'
import Map from '../Map/index.jsx'
import Home from '../Home/index.jsx'

class App extends React.Component {
    render() {
        return (<Home />)
    }
}

export default connect()(App)