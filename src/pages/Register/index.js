import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import TextField from "../../components/UI/TextField";

import api from "../../services/api";
import logo from "../../assets/logocodeit.svg";

import { Container } from "./styles";
import AccountType from "./AccountType";

export default function Register() {
  const history = useHistory();

  const [formError, setFormError] = useState("");

  const [accountType, setAccountType] = useState("estudante");

  const [identifier, setIdentifier] = useState("");
  const [identifierError, setIdentifierError] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  function validateFilledField(field, setError) {
    if (field !== "") {
      return true;
    } else {
      setError(true);
      setFormError("Preencha todos os campos corretamente");
      return;
    }
  }

  function passwordVerification() {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setFormError("As senhas não sao iguas");
      return false;
    } else if (password.length < 6) {
      setPasswordError(true);
      setFormError("A senha deve conter ao menos 6 caracteres");
      return false;
    } else {
      return true;
    }
  }

  function allFieldsAreValid() {
    const identifierIsFilled = validateFilledField(
      identifier,
      setIdentifierError
    );
    const nameIsFilled = validateFilledField(name, setNameError);
    const emailIsFilled = validateFilledField(email, setEmailError);
    const passwordIsFilled = validateFilledField(password, setPasswordError);
    const confirmPasswordIsFilled = validateFilledField(
      confirmPassword,
      setPasswordError
    );

    if (
      !identifierIsFilled ||
      !nameIsFilled ||
      !emailIsFilled ||
      !passwordIsFilled ||
      !confirmPasswordIsFilled
    ) {
      return false;
    } else return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!allFieldsAreValid()) {
      console.log("nao é valido");
      return;
    } else {
      const passwordIsValid = passwordVerification();
      if (passwordIsValid) {
        try {
          await api.post("/users", {
            id: identifier,
            name,
            email,
            password,
            is_teacher: accountType === "teacher"
          });

          history.push("/login");
        } catch (error) {
          if (error.response.status === 409) {
            if (
              error.response.data.error ===
              "Este ID já esta cadastrado para outro usuario"
            ) {
              setFormError(
                `Este ${
                  accountType === "professor" ? "número de Matrícula" : "GRR"
                } já esta cadastrado para outro usuario`
              );
              setIdentifierError(true);
            } else {
              setFormError(error.response.data.error);
              setEmailError(true);
            }
          } else if (error.response.status === 400) {
            setFormError("Este não é um email válido");
            setEmailError(true);
          }
        }
      }
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="CodeIt!" />
        <h1>Cadastro</h1>

        <AccountType value={accountType} onChange={setAccountType} />

        <TextField
          label={accountType === "professor" ? "Matrícula" : "GRR"}
          type="number"
          value={identifier}
          onChange={setIdentifier}
          error={identifierError}
          onFocus={() => setIdentifierError(false)}
        />
        <TextField
          label="Nome"
          type="text"
          value={name}
          onChange={setName}
          error={nameError}
          onFocus={() => setNameError(false)}
        />
        <TextField
          label="email"
          type="email"
          value={email}
          onChange={setEmail}
          error={emailError}
          onFocus={() => setEmailError(false)}
        />
        <TextField
          label="senha"
          type="password"
          value={password}
          onChange={setPassword}
          error={passwordError}
          onFocus={() => setPasswordError(false)}
        />
        <TextField
          label="Confirmar senha"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={passwordError}
          onFocus={() => setPasswordError(false)}
        />
        <p className="error">{formError}</p>

        <button type="submit">Criar Conta</button>
      </form>
    </Container>
  );
}
