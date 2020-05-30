import React, { useState } from "react";
import { store } from "react-notifications-component";

import NotificationBody from "../../../components/Notification";
import api from "../../../services/api";
import TextField from "../../../components/UI/TextField";
import { Container } from "./styles";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  async function updatePassword(e) {
    e.preventDefault();

    if (!oldPassword) {
      setOldPasswordError("Preencha todos os campos corretamente");
      if (!newPassword || !confirmPassword) {
        setNewPasswordError("Preencha todos os campos corretamente");
      }
    } else if (!newPassword || !confirmPassword) {
      setNewPasswordError("Preencha todos os campos corretamente");
    } else if (!(newPassword === confirmPassword)) {
      setNewPasswordError("As senhas não são iguais");
    } else if (!(newPassword.length >= 6)) {
      setNewPasswordError("A senha deve conter ao menos 6 caracteres");
    } else {
      try {
        const token = localStorage.getItem("token");

        const authentication = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        await api
          .put(
            "users",
            {
              oldPassword,
              password: newPassword,
            },
            authentication
          )
          .then(() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            const content = (
              <NotificationBody
                type="success"
                message="Sua senha foi atualizada"
              />
            );
            store.addNotification({
              content,
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 4000,
                onScreen: false,
              },
            });
          });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setOldPasswordError(error.response.data.error);
          }
        }
      }
    }
  }
  return (
    <Container>
      <form className="changePassword" onSubmit={updatePassword}>
        <h3>Alterar senha</h3>
        <div className="passwordFields">
          <TextField
            label="Sua senha"
            type="password"
            value={oldPassword}
            onChange={setOldPassword}
            error={oldPasswordError}
            onFocus={() => setOldPasswordError("")}
          />
          <TextField
            label="Nova senha"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            error={newPasswordError}
            onFocus={() => setNewPasswordError("")}
          />
          <TextField
            label="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={newPasswordError}
            onFocus={() => setNewPasswordError("")}
          />
        </div>
        <p className="error">{oldPasswordError || newPasswordError}</p>
        <button type="submit">Atualizar Senha</button>
      </form>
    </Container>
  );
}
