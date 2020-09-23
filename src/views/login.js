/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import mainStyle from "../assets/css/main.css";
import utilStyle from "../assets/css/util.css";
import venStyle1 from "../assets/vendor/bootstrap/css/bootstrap.min.css";
import venStyle2 from "../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import venStyle3 from "../assets/vendor/animate/animate.css";
import venStyle4 from "../assets/vendor/css-hamburgers/hamburgers.min.css";
import venStyle5 from "../assets/vendor/select2/select2.min.css";
import icon from "../assets/img/icons/favicon.ico";
import Tilt from "react-tilt";
import axios from 'axios'
const transport = axios.create({
  withCredentials: true,
})

function Login (props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader,setLoader]=useState(false)
  const handleTextfield = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value)
        break
      case "password":
        setPassword(e.target.value)
        break
    }
  }
  const handleSubmit=async (e) => {
    setLoader(true)
    e.preventDefault()
    const { data } = await transport.post('http://localhost:5000/admin/signin',{
      email,
      password
    })
    if(data.status){
      props.handleAuthentication(true)
      alert(data.exp)
    }
    else{
      setLoader(false)
      alert(data.exp)
    }
  }

  return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <Tilt
              className="Tilt"
              options={{ max: 25 }}
              style={{ height: 250, width: 250 }}
            >
              <div className="login100-pic js-tilt">
                <img src={require("../assets/img/img-01.png")} alt="IMG" />
              </div>
            </Tilt>
            <form
              className="login100-form validate-form"
              onSubmit={handleSubmit}
            >
              <span className="login100-form-title">Admin Login</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleTextfield}
                  placeholder="Email"
                  autoComplete="off"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleTextfield}
                  placeholder="Password"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                {loader&&<span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
                  Login
                </button>
              </div>

              <div className="text-center p-t-12"></div>
            </form>
          </div>
        </div>
      </div>
    );

}

export default Login;
