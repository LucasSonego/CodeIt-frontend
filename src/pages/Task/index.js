import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";
import { TiArrowBack } from "react-icons/ti";

import api from "../../services/api";
import getUserData from "../../util/getUserData";
import pushToPage from "../../util/pushToPage";
import CodeEditor from "../../components/UI/CodeEditor";

import { Container } from "./styles";
import NotificationBody from "../../components/Notification";

function Task() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState("");

  const [taskData, setTaskData] = useState({});
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "tarefas",
    });

    async function awaitAsyncRequests() {
      await getUserData({ dispatch, history, newtoken: true });

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
        const data = response.data.answer || response.data;

        setCode(data.code);
        setLanguage(data.language);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          pushToPage({ page: "tarefas", dispatch, history });
          const content = (
            <NotificationBody
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
    awaitAsyncRequests();
  }, [dispatch, history, id]);

  function backToTasks() {
    pushToPage({ page: "tarefas", dispatch, history });
  }

  async function handleSubmit() {
    if (!code || code === taskData.code) {
      setError("Não há nada à ser enviado na resposta");
      return;
    }
    if (taskData.answer && code === taskData.answer.code) {
      setError("Não há nenhuma alteração à ser enviada na resposta");
      return;
    }
    if (!taskData.language && !language) {
      setError("Selecione uma linguagem");
      return;
    }

    setError("");

    const answerLanguage = taskData.language || language;

    const token = localStorage.getItem("token");

    try {
      let response;

      if (!taskData.answer) {
        response = await api.post(
          `/answers/${taskData.id}`,
          {
            code,
            language: answerLanguage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await api.put(
          `/answers/${taskData.id}`,
          {
            code,
            language: answerLanguage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 200) {
        const content = (
          <NotificationBody
            type="success"
            message={
              taskData.answer
                ? "Resposta alterada com sucesso"
                : "Resposta enviada com sucesso"
            }
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
          setCode(response.data.answer.code);
        } catch (error) {}
      }
    } catch (error) {
      const content = (
        <NotificationBody
          type="error"
          message="Ocorreu um erro"
          description={
            taskData.answer
              ? "Não foi possível enviar suas alterações"
              : "Não foi possível enviar sua resposta"
          }
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

  return (
    <Container>
      <div className="task">
        {taskData.id && (
          <div className="taskdata">
            <button className="back" onClick={backToTasks}>
              <TiArrowBack /> Voltar à página de tarefas
            </button>
            {!taskData.user_enrolled && (
              <div className="warning">
                <span>
                  Você não está matriculado na disciplina a qual esta tarefa
                  está vinculada, você poderá realizá-la mas não poderá enviar
                  sua resposta
                </span>
              </div>
            )}
            {taskData.answer && taskData.answer.accepted_at ? (
              <div className="warning">
                <span>
                  Sua resposta para esta tarefa já foi aceita, portanto você não
                  poderá alterá-la
                </span>
              </div>
            ) : (
              !taskData.answer &&
              taskData.closed_at && (
                <div className="warning">
                  <span>
                    Esta tarefa já está fechada, você poderá realizá-la mas não
                    poderá enviar sua resposta
                  </span>
                </div>
              )
            )}

            {taskData.discipline && (
              <div className="disciplinedata">
                <div className="discipline">
                  <span className="name">{taskData.discipline.name}</span>
                  <span className="id">{taskData.discipline.id}</span>
                </div>
                <div className="teacher">
                  <span className="name">
                    {taskData.discipline.teacher.name}
                  </span>
                  <span className="email">
                    {taskData.discipline.teacher.email}
                  </span>
                </div>
              </div>
            )}
            <div className="taskdetails">
              <h4>{taskData.title}</h4>
              <span>{taskData.description}</span>
            </div>
          </div>
        )}
        <CodeEditor
          initialValue={code}
          value={code}
          onChange={setCode}
          language={language}
          setLanguage={setLanguage}
          allowLanguageSelection={!taskData.language}
        />
        <div className="submit">
          <p className="error">{error}</p>
          <button
            disabled={
              !taskData.user_enrolled ||
              (taskData.closed_at && !taskData.answer) ||
              (taskData.answer && taskData.answer.accepted_at)
            }
            onClick={handleSubmit}
          >
            {taskData.answer ? "Alterar resposta" : "Enviar resposta"}
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Task;
