import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/logocodeit.svg";
import { Container } from "./styles";

export default function ErrorPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "404",
    });
  });

  return (
    <Container>
      <img src={logo} alt="CodeIt!" />
      <h1>404</h1>
      <h2>Página inexistente</h2>
      <button onClick={() => history.push("/")}>Voltar à página inicial</button>
    </Container>
  );
}
