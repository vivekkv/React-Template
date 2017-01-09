import React,  { PropTypes  } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Navigation from '../Navigation/index.jsx'
import Textbox from '../../Presentational/Textbox/index.jsx'
import Form from '../../Presentational/Form/index.jsx'
import Notify from '../../Presentational/Utils/notify.jsx'
import { inputChanged, submitLogin } from '../../../actions/login'
import { selectLogin, selectErrors } from '../../../selectors/login'
import styles from './styles.css'

class Login extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.login = this.login.bind(this)
    }

    render() {
        return (<div className={styles.login_wrapper}>
                <Form onSubmit={this.login} formData={this.props.data} onChange={this.props.onChange}>
                    <h1 className={styles.login_header}>account login</h1>
                    <Textbox type="text" name="mobile" placeholder="enter your mobile number" />
                    <Textbox type="password" name="password" placeholder="enter your password" />
                    <input type="submit" value="Sign me in!" className={styles.submit_btn}/>
                    <Notify errorCheck={true} data={this.props.errors} type="warning"/>
                    <div className="text-center">
                         <Link to="/register">create an account</Link> - <a href="#" id="">forgot password</a>
                    </div>
                </Form>
            </div>)
    } 

    login(e) {
        e.preventDefault()
        this.props.dispatch(submitLogin(this.props.data.toObject(), (route) => {
            this.context.router.replace(route)
        }))
    }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        'data' : selectLogin(state),
        'errors': selectErrors(state)
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