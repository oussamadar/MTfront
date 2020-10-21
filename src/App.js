import React, { Component } from "react";
import Landing from "./components/layouts/Landing";
import Header from "./components/layouts/Header";
import Beneficiare from "./components/beneficiare/Beneficiare";
import SideBar from "./components/layouts/SideBar";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListVirement from "./components/virement/ListVirement";
import Login from "./components/userManagements/Login";
import Home from "./components/Home";
import setJWTToken from "./securityUtils/setJwtToken";
import SecuredRoute from "./securityUtils/SecuredRoute";
import { SET_CURRENT_USER } from "./actions/type";
import { logout } from "./actions/securityActions";
import jwt_decode from "jwt-decode";

const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="wrapper">
          <Router>
            <Landing></Landing>
            <div id="page-wrapper" class="gray-bg">
              <Route exact path="/login" component={Login} />
              <div class="wrapper wrapper-content">
                <SideBar></SideBar>

                <Switch>
                  <SecuredRoute
                    exact
                    path="/Benefeciare"
                    component={Beneficiare}
                  ></SecuredRoute>
                  <SecuredRoute
                    exact
                    path="/ListVirement"
                    component={ListVirement}
                  />
                  <SecuredRoute exact path="/*" component={Home}></SecuredRoute>
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}
export default App;
