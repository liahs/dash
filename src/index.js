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
import {socket} from './socketCon'
import AdminLayout from "layouts/Admin.js";
import Login from "views/login";
import axios from 'axios'
import Api from './defaultApi'
import {UserContext} from './contextUserState'
import NotificationAlert from "react-notification-alert";

var options =(user,type)=>({
  place: 'br',
  message: (
      <div>
          <div>
           <h3>{type}</h3>
            User:{user}
          </div>
      </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss:7 
})


const hist = createBrowserHistory();

export default function App() {
  const [isauthenticated, authentication] = useState(false);
  const [loading, changeloading] = useState(true);
  const notify=React.useRef(null)
  useEffect(() => {
    async function fetchData() {
      const token=localStorage.getItem('token')
      const { data } = await axios.post(Api+'/admin/checksignin',{},{
        headers:{
          'authorization':token
        }
      })
      if(data.status){
        changeloading(false)
          authentication(true)
      }
      else{
       changeloading(false)
      }
    }
    socket.on('rescueRequest',(data)=>{
      if(isauthenticated){
         notify.current.notificationAlert(options(data.name,data.type));
      }
    })
    fetchData()
    return ()=>{console.log('fred')}
    },[isauthenticated])
 
 const handleAuthentication=(x)=>{
  authentication(x)
  }
      return (
    <div>
       <NotificationAlert ref={notify} />
      {loading ? (
        <img src={logo} style={{position:'absolute',left:"50%",top:'50%'}}/>
      ) : (
        <UserContext.Provider value={{handleAuthentication}}>
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
        </UserContext.Provider>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
