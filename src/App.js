import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

import Routes from "./routes";

const App = () => (
  <>
    <ReactNotification />
    <Routes />
  </>
);

export default App;
