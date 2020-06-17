import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./util/PrivateRoute";

import store from "./store";

import Loign from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NavBar from "./components/UI/NavBar";
import User from "./pages/User";
import Disciplines from "./pages/Disciplines";
import ErrorPage from "./pages/404";
import Tasks from "./pages/Tasks";
import Task from "./pages/Task";

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" component={Loign} />
        <Route path="/cadastro" component={Register} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/dados" component={User} />
        <PrivateRoute path="/disciplinas" component={Disciplines} />
        <PrivateRoute exact path="/tarefas" component={Tasks} />
        <PrivateRoute path="/tarefas/:id" component={Task} />
        <PrivateRoute path="/feedbacks" component={() => <h2>Feedbacks</h2>} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;
