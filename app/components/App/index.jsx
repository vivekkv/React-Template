import React from 'react'
import { connect } from 'react-redux'
import { getAvilableDrivers } from '../../actions/map'

class App extends React.Component {

    render() {
        return (this.props.children)
    }
}

export default connect()(App)