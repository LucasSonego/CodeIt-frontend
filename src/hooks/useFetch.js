import React from "react";
import useSWR from "swr";
import api from "../services/api";
import NotificationBody from "../components/Notification";
import pushToPage from "../util/pushToPage";
import { store } from "react-notifications-component";

export default function useFetch({ path, params, dispatch, history }) {
  const { data, mutate } = useSWR(path, async path => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(path, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (path === "/sessions") {
        dispatch({
          type: "SET_USER_DATA",
          userData: response.data.user,
        });
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
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
  });
  return { data, mutate };
}
