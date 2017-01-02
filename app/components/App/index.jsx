import React from 'react'
import { connect } from 'react-redux'
import Map from '../Map/index.jsx';
import Home from '../Home/index.jsx';

import { location } from '../../selectors/app.js';

class App extends React.Component {
    render() {
        return (<Home />)
    }
}

function mapStateProps(state) {
    return {
        'center': location(state)
    }
}

export default connect(mapStateProps)(App)