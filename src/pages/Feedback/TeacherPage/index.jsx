import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";

import { Container, StyledTextArea } from "./styles";
import api from "../../../services/api";
import pushToPage from "../../../util/pushToPage";
import NotificationBody from "../../../components/Notification";
import CodeEditor from "../../../components/UI/CodeEditor";

function TeacherPage() {
  const [answerData, setAnswerData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    async function awaitAsyncCalls() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/answers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id,
          },
        });

        if (response && response.status === 200) {
          setAnswerData(response.data);
          let _code;
          if (!response.data.feedback_code) {
            _code = response.data.code;
          } else {
            new Date(response.data.updated_at).getTime() >
            new Date(response.data.feedback_at).getTime()
              ? (_code = response.data.code)
              : (_code = response.data.feedback_code);
          }
          setCode(_code);
          setFeedback(response.data.feedback);
        }
      } catch (error) {
        if (error.response) {
          let content;
          if (error.response.status === 404) {
            content = (
              <NotificationBody
                type="error"
                message="Não há nenhuma resposta com este id"
              />
            );
          } else if (error.response.status === 401) {
            content = (
              <NotificationBody
                type="error"
                message="Você não tem permissão para dar feedback para esta resposta"
              />
            );
          }

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

          pushToPage({ page: "tarefas", dispatch, history });
        }
      }
    }

    awaitAsyncCalls();
  }, [dispatch, history, id]);

  async function sendFeedback(accepted) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/feedback/${answerData.id}`,
        {
          feedback: feedback || null,
          code: code !== answerData.code ? code : null,
          accepted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const content = (
          <NotificationBody type="success" message="Feedback enviado" />
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
          const token = localStorage.getItem("token");
          const response = await api.get(`/answers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id,
            },
          });

          if (response && response.status === 200) {
            setAnswerData(response.data);
            let _code;
            if (!response.data.feedback_code) {
              _code = response.data.code;
            } else {
              new Date(response.data.updated_at).getTime() >
              new Date(response.data.feedback_at).getTime()
                ? (_code = response.data.code)
                : (_code = response.data.feedback_code);
            }
            setCode(_code);
            setFeedback(response.data.feedback);
          }
        } catch (error) {}
      }
    } catch (error) {
      const content = (
        <NotificationBody
          type="error"
          message="Erro"
          description="Não foi possível enviar o feedback"
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
      {answerData.id && (
        <>
          <div className="task-details">
            <h3>{answerData.task.title}</h3>
            <p>{answerData.task.description}</p>
            <span>{answerData.task.discipline.name}</span>
          </div>
          <div className="editor">
            <span className="label">
              Código{" "}
              {answerData.feedback_at &&
                (new Date(answerData.updated_at).getTime() >
                new Date(answerData.feedback_at).getTime()
                  ? `(Alterado pelo aluno ${new Date(
                      answerData.updated_at
                    ).toLocaleTimeString([], {
                      timeStyle: "short",
                    })} ${new Date(
                      answerData.updated_at
                    ).toLocaleDateString()})`
                  : `(Feedback ${new Date(
                      answerData.feedback_at
                    ).toLocaleTimeString([], {
                      timeStyle: "short",
                    })} ${new Date(
                      answerData.feedback_at
                    ).toLocaleDateString()})`)}
            </span>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={answerData.language}
              allowLanguageSelection={false}
            />
          </div>
          <div className="comment">
            <span className="label">Feedback</span>
            <StyledTextArea
              className="description-input"
              rows="4"
              value={feedback || ""}
              onChange={event => setFeedback(event.target.value)}
              disabled={answerData.accepted_at}
            />
          </div>
          {answerData.accepted_at ? (
            <div className="accepted">
              <span>Resposta aceita</span>
            </div>
          ) : (
            <div className="buttons">
              <button className="accept" onClick={() => sendFeedback(true)}>
                {feedback || code !== answerData.code
                  ? "Aceitar resposta e enviar feedback"
                  : "Aceitar resposta"}
              </button>
              <button className="deny" onClick={() => sendFeedback(false)}>
                {feedback || code !== answerData.code
                  ? "Enviar feedback e não aceitar resposta"
                  : "Não aceitar resposta"}
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default TeacherPage;
