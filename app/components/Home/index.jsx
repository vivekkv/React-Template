import React from 'react'
import { connect  } from 'react-redux'
import Navigation from './Navigation/index.jsx'
import { loginRequest } from '../../actions/login.js'
import styles from './styles.css'
import Auth from '../../auth' 

class Home extends React.Component {

    constructor() {
        super()
        Auth.deauthenticateUser()
    }

    render() {
        return (<div className={styles.wrapper}>
            <Navigation />
            {this.props.children}
        </div>)
    }
}  

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin : function(username, password) {
            dispatch(loginRequest(username, password))
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)