import React from 'react'
import styles from './styles.css'

export default class Login extends React.Component {

    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (<div className="row">
            <div className="col-lg-12">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.wrap}>
                                <p className={styles.form_title}>
                                    Sign In</p>
                                    <form className={styles.login_form} onSubmit={this.onLogin}>
                                        <input type="text" ref="username" className={styles.form_control} placeholder="Mobile Number" />
                                        <input type="password" ref="password" className={styles.form_control} placeholder="Password" />
                                        <input type="submit" value="Sign In" className={styles.form_submit} />
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

    onLogin(e) {
      this.props.onLogin(this.refs.username.value, this.refs.password.value)
      e.preventDefault();
    }
}

Login.propTypes = {
    onLogin: React.PropTypes.func
}