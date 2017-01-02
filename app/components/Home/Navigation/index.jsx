import React from 'react'
import styles from './styles.css' 

export default class Navigation extends React.Component {

    render() {
        return (<nav className={styles.navbarinverse} role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand"><img src="/assets/img/autoIco.png" /></a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            
                        </ul>
                    </div>
                </div>
            </nav>)
    }

}