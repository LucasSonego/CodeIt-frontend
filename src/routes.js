import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

import Loign from "./components/Login";
import Home from "./components/Home";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={() => <h2>Home</h2>} />
      <Route path="/login" component={() => <h2>Login</h2>} />
      <Route path="/cadastro" component={() => <h2>Cadastro</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
