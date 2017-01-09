import React from 'react'

export default class Notify extends React.Component {

    render() {
        if(this.props.errorCheck && !(this.props.data.message && this.props.data.message.trim().length == 0)) {
            return <div className={this.getClassNames().join(" ")}>
                <p>{this.props.data.message}</p>
            </div>
        } else {
            return <span></span>
        }
    }

    getClassNames() {
        let warningClasses = ["text", "text-center"];
        if(this.props.type == "warning") {
            warningClasses.push("bg-warning")
        } else if(this.props.type == "error") {
            warningClasses.push("error")
        } else {
            warningClasses.push("success")
        }
        return warningClasses
    }
}

Notify.propTypes = {
    data: React.PropTypes.object,
    type: React.PropTypes.oneOf(["warning", "error", "success"]),
    errorCheck: React.PropTypes.bool
}

Notify.defaultProps = {
    type : "warning",
    data: {},
    errorCheck: true
}