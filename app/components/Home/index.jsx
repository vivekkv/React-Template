import React from 'react'
import Navigation from './Navigation/index.jsx'
import Content from './Content/index.jsx'
import { connect  } from 'react-redux'
import { loginRequest } from '../../actions/login.js'
import styles from './styles.css'

class Home extends React.Component {

    render() {
        return (<div className={styles.wrapper}>
            <Navigation />
            
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