import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

import Loign from "./components/Login";
import Home from "./components/Home";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" component={Loign} />
      <Route path="/cadastro" component={() => <h2>Cadastro</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
