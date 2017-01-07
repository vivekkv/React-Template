import React from 'react'
import Login from '../Login/index.jsx'

export default class Content extends React.Component {
    render() {
        return (<div className="container-fluid">
                <Login {...this.props}/>
        </div>)
    }
}

Content.propTypes = {
    onLogin: React.PropTypes.func
}