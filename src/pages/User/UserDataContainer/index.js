import React, { useState, useEffect } from "react";
import { store } from "react-notifications-component";

import NotificationBody from "../../../components/Notification";
import api from "../../../services/api";
import EditableContentBox from "../../../components/UI/EditableContentBox";

import { Container } from "./styles";

export default function UserDataContainer({ userData }) {
  const [newUserData, setNewUserData] = useState({});
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setNewUserData({ ...userData });
  }, [userData]);

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
          setEmailError("Este email já está cadastrado para outro usuário");
        }
      }
    }
  }

  return (
    <Container>
      <form onSubmit={updateUserData}>
        <h2>Seus dados</h2>

        <div className="userData">
          <div className="grr">
            <span>{userData.is_teacher ? "Matrícula" : "GRR"}</span>
            <p>{userData.id}</p>
          </div>

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
        </div>

        <p className="error">{emailError}</p>
        <button type="submit">Atualizar Dados</button>
      </form>
    </Container>
  );
}
