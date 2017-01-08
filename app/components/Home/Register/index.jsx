import React,  { PropTypes  } from 'react'
import Navigation from '../Navigation/index.jsx'
import Textbox from '../../Presentational/Textbox/index.jsx'
import Form from '../../Presentational/Form/index.jsx'
import { connect } from 'react-redux'
import { inputChanged, submitLogin } from '../../../actions/register'
import styles from './styles.css'
import { Link } from 'react-router'

class Register extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.processLogin = this.processLogin.bind(this)
    }

    render() {
        return (<div className={styles.register_wrapper}>
                <Form>
                    <h1 className={styles.register_header}>create an account</h1>
                    <input className={styles.input} placeholder="what is your mobile number ?" />
                    <input className={styles.input} placeholder="choose password" />
                    <input className={styles.input} placeholder="confirm password" />
                    <input  type="submit" value="Sign me up!" className={styles.submit_btn}/>
                    <div className="text-center">
                        already have an account?<Link to={"/"}>login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)