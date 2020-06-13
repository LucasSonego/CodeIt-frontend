import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";

import api from "../../services/api";
import pushToPage from "../../util/pushToPage";

import { Container } from "./styles";
import NofiticationBody from "../../components/Notification";

function Task() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "tarefas",
    });

    async function awaitTaskData() {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/tasks", {
          params: {
            id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTaskData(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.clear();
          pushToPage({ page: "login", dispatch, history });
          const content = (
            <NofiticationBody
              type="error"
              message="Sua sessão expirou, faça login novamente"
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
        }
        if (error.response.status === 404) {
          pushToPage({ page: "tarefas", dispatch, history });
          const content = (
            <NofiticationBody
              type="error"
              message="Esta tarefa não foi encontrada"
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
        }
      }
    }
    awaitTaskData();
  }, [dispatch, history, id]);
  return (
    <Container>
      {taskData && (
        <span>
          {taskData.title} <br /> {taskData.description}
        </span>
      )}
    </Container>
  );
}

export default Task;
