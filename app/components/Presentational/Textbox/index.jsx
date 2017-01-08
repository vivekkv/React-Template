import React from 'react'
import styles from './styles.css'

export default class Textbox extends React.Component {

    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
    }

    render() {
        return (<input className={styles.input} placeholder={this.props.placeholder} value={this.props.value}  type={this.props.type} onChange={this.onChange} name={this.props.name} />)
    }

    onChange(e) {
        this.props.onChange(this.props.name, e.target.value)
    }
}   
 
Textbox.propTypes = {
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    placeHolder: React.PropTypes.string
}