import React from "react";
import { store } from "react-notifications-component";
import api from "../services/api";
import pushToPage from "./pushToPage";
import NotificationBody from "../components/Notification";

export default async function getUserData({ dispatch, history, newtoken }) {
  const token = localStorage.getItem("token");
  try {
    const data = await api
      .get("/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          newtoken,
        },
      })
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (newtoken) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      });

    if (data) {
      return data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        const content = (
          <NotificationBody
            type="error"
            message="Sua sessão expirou"
            description="Faça Login novamente"
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
        localStorage.clear();
        pushToPage({ page: "login", dispatch, history });
      }
    }
  }
}
