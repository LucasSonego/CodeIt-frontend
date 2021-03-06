import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import logo from "../../assets/logocodeit.svg";
import pushToPage from "../../util/pushToPage";

import { Container } from "./styles";
import TextField from "../../components/TextField";

export default function Login() {
  const history = useHistory();

  const [error, setError] = useState(" ");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentPage = useSelector(state => state.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage !== "login") {
      dispatch({
        type: "SET_CURRENT_PAGE",
        page: "login",
      });
    }
  }, [currentPage, dispatch]);

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Preencha os campos de email e senha");
      return;
    }

    let response;

    try {
      response = await api.post("/sessions", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: "SET_USER_DATA",
          userData: response.data.user,
        });

        pushToPage({ page: "", dispatch, history });
      }
    } catch (error) {
      setError("Usuário ou senha inválidos");
    }
  }

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <img src={logo} alt="CodeIt!" />
        <h1>Login</h1>

        <div className="inputs">
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <TextField
            label="senha"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <p className="error">{error}</p>
        <div className="buttons">
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => history.push("/cadastro")}>
            Cadastre-se
          </button>
        </div>
      </form>
    </Container>
  );
}
