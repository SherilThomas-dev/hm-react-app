import React, { Component } from "react";
import "../index.css";
import { withRouter } from 'react-router-dom';
class Login extends Component {

    constructor(props) {
        super(props);
    }
    onSubmitClickHandler = (event) => {
        this.props.userNameChanged(event.target.elements.namedItem("txtUserName").value);
        this.props.history.push('/Browse');
    }
    render() {
        return (
            <div className="main">
                <form onSubmit={this.onSubmitClickHandler}
                    className="login_form">
                    <div id="loginbody">
                        <label><b>Login</b></label>
                    </div>
                    <div>
                        <label><b>UserName</b></label>
                        <input type="text" placeholder="Enter User Name" name="txtUserName" required></input>
                    </div>
                    <div>
                        <label><b>Password</b></label>
                        <input type="Password" placeholder="Enter Password" name="txtPsw" required></input>
                    </div>
                    <div className="login_btn">
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(Login)