import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

import Loign from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" component={Loign} />
      <Route path="/cadastro" component={Register} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
