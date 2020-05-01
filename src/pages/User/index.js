import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";

import api from "../../services/api";
import getUserData from "../../util/getUserData";

import { Container, UserData } from "./styles";
import EditableContentBox from "../../components/UI/EditableContentBox";
import TextField from "../../components/UI/TextField";
import NotificationBody from "../../components/Notification";

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [emailError, setEmailError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  useEffect(() => {
    async function awaitUserData() {
      const data = await getUserData({
        dispatch,
        history,
        newtoken: true,
      });

      if (data) {
        setUserData(data.user);
        setNewUserData(data.user);
      }
    }

    awaitUserData();

    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "dados",
    });
  }, [dispatch, history]);

  async function updateUserData(e) {
    e.preventDefault();

    if (
      newUserData.name &&
      newUserData.email &&
      (newUserData.name !== userData.name ||
        newUserData.email !== userData.email)
    ) {
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
              name: newUserData.name,
              email: newUserData.email,
            },
            authentication
          )
          .then(response => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUserData(response.data);
            setNewUserData(response.data);
            const content = (
              <NotificationBody
                type="success"
                message="Seus dados foram atualizados"
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
          setEmailError(error.response.data.error);
        }
      }
    }
  }

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
          console.log(error.response);
          if (error.response.status === 401) {
            setOldPasswordError(error.response.data.error);
          }
        }
      }
    }
  }

  return (
    <Container>
      <UserData>
        <form className="personalData" onSubmit={updateUserData}>
          <h2>Seus dados</h2>
          <span>{userData.is_teacher ? "Matrícula" : "GRR"}</span>
          <p>{userData.id}</p>

          <EditableContentBox
            label="Nome"
            value={newUserData.name}
            onChange={event =>
              setNewUserData({ ...newUserData, name: event.target.value })
            }
          />

          <EditableContentBox
            label="email"
            inputType="email"
            value={newUserData.email}
            onChange={event =>
              setNewUserData({ ...newUserData, email: event.target.value })
            }
            error={emailError}
            onFocus={() => setEmailError("")}
          />

          <p className="error">{emailError}</p>
          <button type="submit">Atualizar Dados</button>
        </form>
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
      </UserData>
    </Container>
  );
}
