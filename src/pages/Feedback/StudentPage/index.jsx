import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";

import { Container } from "./styles";
import api from "../../../services/api";
import NotificationBody from "../../../components/Notification";
import DiffEditor from "../../../components/UI/DiffEditor";
import CodeEditor from "../../../components/UI/CodeEditor";
import pushToPage from "../../../util/pushToPage";

function StudentPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    function noFeedback() {
      const content = (
        <NotificationBody
          type="error"
          message="Não há nenhum feedback para esta tarefa"
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

      pushToPage({ page: "feedbacks", dispatch, history });
    }

    async function awaitData() {
      const token = localStorage.getItem("token");

      try {
        const response = await api.get(
          `/tasks`,
          {
            params: {
              id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          {}
        );

        if (
          !response.data.answer.feedback &&
          !response.data.answer.feedback_code &&
          !response.data.answer.accepted_at
        ) {
          noFeedback();
        }
        setTaskData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          noFeedback();
        }
      }
    }

    awaitData();
  }, [dispatch, history, id]);

  return (
    <Container>
      <div className="padding-on-mobile">
        <button
          className="back"
          onClick={() => pushToPage({ page: "feedbacks", dispatch, history })}
        >
          <TiArrowBackOutline /> Voltar à lista de feedbacks
        </button>
      </div>

      {taskData.id && (
        <>
          <div className="padding-on-mobile">
            {!taskData.answer.accepted_at &&
              new Date(taskData.answer.updated_at).getTime() >
                new Date(taskData.answer.feedback_at).getTime() && (
                <div className="warning">
                  As ultimas alterações feitas na resposta ainda não foram
                  avaliadas
                </div>
              )}

            <h3>{taskData.title}</h3>
            <p>{taskData.description}</p>
            <h4>Resposta:</h4>
          </div>

          {taskData.answer.feedback_code ? (
            <DiffEditor
              code={taskData.answer.code}
              diffCode={taskData.answer.feedback_code}
              language={taskData.answer.language}
            />
          ) : (
            <CodeEditor
              language={taskData.answer.language}
              value={taskData.answer.code}
              height="400px"
            />
          )}
          <div className="padding-on-mobile">
            {taskData.answer.feedback && (
              <>
                <h4>Comentário:</h4>
                <p>{taskData.answer.feedback}</p>
              </>
            )}
            {taskData.answer.accepted_at ? (
              <div className="accepted">
                <span>Sua resposta foi avaliada e foi aceita!</span>
              </div>
            ) : (
              <>
                <div className="not-accepted">
                  <span>Sua resposta foi avaliada e não foi aceita</span>
                </div>
                {!taskData.closed_at && (
                  <button
                    className="edit-answer"
                    onClick={() =>
                      pushToPage({
                        page: `tarefas/${taskData.id}`,
                        dispatch,
                        history,
                      })
                    }
                  >
                    <span>Alterar resposta</span>
                    <TiArrowForwardOutline />
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

export default StudentPage;
