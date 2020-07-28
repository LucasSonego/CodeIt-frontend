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
  const [feedbackCode, setFeedbackCode] = useState("");
  const [accepted, setAccepted] = useState(false);

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
          setFeedbackCode(response.data.code);
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
        } else {
          console.log(error);
        }
      }
    }

    awaitAsyncCalls();
  }, [dispatch, history, id]);

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
            <span className="label">Código</span>
            <CodeEditor
              value={feedbackCode}
              onChange={setFeedbackCode}
              language={answerData.language}
              allowLanguageSelection={false}
            />
          </div>
          <div className="comment">
            <span className="label">Feedback</span>
            <StyledTextArea
              className="description-input"
              rows="4"
              value={feedback}
              onChange={event => setFeedback(event.target.value)}
            />
          </div>
          <div className="buttons">
            <button className="accept">
              {feedback || feedbackCode !== answerData.code
                ? "Aceitar resposta e enviar feedback"
                : "Aceitar resposta"}
            </button>
            <button className="deny">
              {feedback || feedbackCode !== answerData.code
                ? "Enviar feedback e não aceitar resposta"
                : "Não aceitar resposta"}
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default TeacherPage;
