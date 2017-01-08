import React,  { PropTypes  } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Navigation from '../Navigation/index.jsx'
import Textbox from '../../Presentational/Textbox/index.jsx'
import Form from '../../Presentational/Form/index.jsx'
import { inputChanged, submitLogin } from '../../../actions/login'
import { selectLogin } from '../../../selectors/login'
import styles from './styles.css'

class Login extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.processLogin = this.processLogin.bind(this)
    }

    render() {
        return (<div className={styles.login_wrapper}>
                <Form onSubmit={this.processLogin} formData={this.props.loginData} onChange={this.props.onChange}>
                    <h1 className={styles.login_header}>account login</h1>
                    <Textbox type="text" name="mobile" placeholder="enter your mobile number" />
                    <Textbox type="password" name="password" placeholder="enter your password" />
                    <input type="submit" value="Sign me in!" className={styles.submit_btn}/>
                    <div className="text-center">
                         <Link to="/register">create an account</Link> - <a href="#" id="">forgot password</a>
                    </div>
                </Form>
            </div>)
    } 

    processLogin(e) {
        e.preventDefault()
        this.props.dispatch(submitLogin(this.props.loginData.toObject(), (route) => {
            this.context.router.replace(route)
        }))
    }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        'loginData' : selectLogin(state)
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