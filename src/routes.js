import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

import Loign from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

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
