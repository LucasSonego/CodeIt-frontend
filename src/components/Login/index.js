import React, { useState } from "react";

import api from "../../services/api";
import logo from "../../assets/logocodeit.svg";

import { Container } from "./styles";
import { useHistory } from "react-router-dom";
import TextField from "../UI/TextField";

export default function Login() {
  const history = useHistory();

  const [error, setError] = useState(" ");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        password
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        history.push("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      setError("Usuário ou senha inválidos");
    }
  }

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <img src={logo} alt="CodeIt!" />
        <h1>Cadastro</h1>

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
        <p className="error">{error}</p>
        <div>
          <button type="submit">Entrar</button>
          <button onClick={() => history.push("/cadastro")}>Cadastre-se</button>
        </div>
      </form>
    </Container>
  );
}
