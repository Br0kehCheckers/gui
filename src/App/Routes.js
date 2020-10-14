import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { isAuthenticated } from "./services/api";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Checker from "./pages/Checker";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

function PrivateRoute(props) {
  return isAuthenticated() ? <Route {...props} /> : <Route component={Login} />;
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/checker/:checkerName" exact component={Checker} />
          <PrivateRoute path="/admin" exact component={Admin} />
          <Route path="*" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
