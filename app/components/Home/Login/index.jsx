import React,  { PropTypes  } from 'react'
import Navigation from '../Navigation/index.jsx'
import Textbox from '../../Presentational/Textbox/index.jsx'
import Form from '../../Presentational/Form/index.jsx'
import { connect } from 'react-redux'
import { inputChanged, submitLogin } from '../../../actions/login'
import styles from './styles.css'
import { Link } from 'react-router'

class Login extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.processLogin = this.processLogin.bind(this)
    }

    render() {
        return (<div className={styles.login_wrapper}>
                <Form>
                    <h1 className={styles.login_header}>account login</h1>
                    <input className={styles.input} placeholder="enter your mobile number" />
                    <input className={styles.input} placeholder="enter your password" />
                    <input  type="submit" value="Sign me in!" className={styles.submit_btn}/>
                    <div className="text-center">
                         <Link to="/register">create an account</Link> - <a href="#" id="">forgot password</a>
                    </div>
                </Form>
            </div>)
    } 

    processLogin(e) {
        e.preventDefault()
        this.props.dispatch(submitLogin(this.props.formData, (route) => {
            this.context.router.replace(route)
        }))
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: function(name, value) {
            dispatch(inputChanged(name, value))   
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)