import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

import Loign from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Loign} />
      <Route path="/cadastro" component={Register} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/dados" component={() => <h2>Dados de usuario</h2>} />
      <PrivateRoute
        path="/disciplinas"
        component={() => <h2>Disciplinas</h2>}
      />
      <PrivateRoute path="/tarefas" component={() => <h2>Tarefas</h2>} />
      <PrivateRoute path="/feedbacks" component={() => <h2>Feedbacks</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
