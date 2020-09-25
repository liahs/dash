/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import logo from 'assets/img/loader.svg' ;

import AdminLayout from "layouts/Admin.js";
import Login from "views/login";
import axios from 'axios'

const hist = createBrowserHistory();

const transport = axios.create({
  withCredentials: true,
})

export default function App() {
  const [isauthenticated, authentication] = useState(false);
  const [loading, changeloading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await transport.get('http://localhost:5000/admin/checksignin')
      if(data.status){
        let timeout=setTimeout(()=>{
        changeloading(false)
          authentication(true)
         clearTimeout(timeout)
        },10)
      }
      else{
        let timeout=setTimeout(()=>{
          changeloading(false)
           clearTimeout(timeout)
          },10)
      }
    }
    fetchData()
    },[isauthenticated])
 const handleAuthentication=(x)=>{
  authentication(x)
  }
      return (
    <div>
      {loading ? (
        <img src={logo} style={{position:'absolute',left:"50%",top:'50%'}}/>
      ) : (
        <Router history={hist}>
          <Switch>
            <Route exact path="/login">
              <Login handleAuthentication={handleAuthentication} />
            </Route>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
          </Switch>
          {isauthenticated ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Redirect to="/login" />
          )}
        </Router>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
