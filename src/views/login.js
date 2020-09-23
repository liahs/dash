/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import mainStyle from '../assets/css/main.css'
import utilStyle from '../assets/css/util.css'
import venStyle1 from '../assets/vendor/bootstrap/css/bootstrap.min.css'
import venStyle2 from '../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import venStyle3 from '../assets/vendor/animate/animate.css'
import venStyle4 from '../assets/vendor/css-hamburgers/hamburgers.min.css'
import venStyle5 from '../assets/vendor/select2/select2.min.css'
import icon from '../assets/img/icons/favicon.ico'
import Tilt from 'react-tilt';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("Text Change Event", event)
        // this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        console.log("Submit Event", event)
        event.preventDefault();
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 250, width: 250 }} >
                            <div className="login100-pic">
                                <img src={require("../assets/img/assetPic.png")} alt="IMG" />
                            </div>
                        </Tilt>
                        <form className="login100-form validate-form">
                            <span className="login100-form-title">
                                Admin Login
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email" autoComplete="off"/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>
                            </div>

                          
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;