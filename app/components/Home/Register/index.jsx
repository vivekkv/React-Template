import React,  { PropTypes  } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Textbox from '../../Presentational/Textbox/index.jsx'
import Form from '../../Presentational/Form/index.jsx'
import Notify from '../../Presentational/Utils/notify.jsx'
import { inputChanged, addNewAccount } from '../../../actions/register'
import { selectData, selectErrors } from '../../../selectors/register'
import styles from './styles.css'

class Register extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.register = this.register.bind(this)
    }

    render() {
        return (<div className={styles.register_wrapper}>
                <Form onSubmit={this.register} formData={this.props.objAccount} onChange={this.props.onChange}>
                    <h1 className={styles.register_header}>create an account</h1>
                    <Textbox type="text" name="mobile" placeholder="what is your mobile number ?" />
                    <Textbox type="text" name="password" placeholder="choose password" />
                    <Textbox type="text" name="confirmPassword" placeholder="confirm password" />
                    <input type="submit" value="Sign me up!" className={styles.submit_btn}/>
                    <Notify errorCheck={true} data={this.props.errors} type="warning"/>
                    <div className="text-center">
                        already have an account?<Link to={"/"}>login</Link>
                    </div>
                </Form>
            </div>)
    } 

    register(e) {
        e.preventDefault()
        this.props.dispatch(addNewAccount(this.props.data.toObject(), (route) => {
            this.context.router.replace(route)
        }))
    }
}

Register.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    console.log(selectData(state))
    return {
        'data' : selectData(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)