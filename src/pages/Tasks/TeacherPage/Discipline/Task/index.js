import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
import { store } from "react-notifications-component";

import api from "../../../../../services/api";
import NotificationBody from "../../../../../components/Notification";
import { Container } from "./styles";

function Task({ data, openTasks, setOpenTasks }) {
  const [expanded, setExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(!data.closed_at);

  async function closeOrOpenTask() {
    const token = localStorage.getItem("token");
    try {
      let response;
      if (isOpen) {
        response = await api.delete(`/tasks/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await api.patch(
          `/tasks/${data.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 200) {
        let content = (
          <NotificationBody
            type="success"
            message={`Tarefa ${!isOpen ? "reaberta" : "fechada"} com sucesso`}
            description={`Esta tarefa ${
              !isOpen ? "poderá receber mais" : "não poderá mais receber"
            } respostas`}
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

        isOpen ? setOpenTasks(openTasks - 1) : setOpenTasks(openTasks + 1);
        isOpen ? setIsOpen(false) : setIsOpen(true);
      }
    } catch (error) {
      setIsOpen(false);
      let content = (
        <NotificationBody
          type="error"
          message="Ocorreu um errro"
          description={`Não foi possivel ${
            isOpen ? "fechar" : "reabrir"
          } esta tarefa`}
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
      <div className="header">
        <div>
          <p>{data.title}</p>
          <div className="info">
            <span>{isOpen ? "Aberta" : "Fechada"}</span>
            <span>{`Respostas: ${data.answers.length}`}</span>
          </div>
        </div>
        <button
          onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
        >
          {expanded ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {expanded && (
        <div className="expanded">
          {data.answers.length > 0 && (
            <>
              <span>Respostas:</span>
              <ul className="answers">
                {/* sem feedback */}
                {data.answers.map(
                  answer =>
                    !answer.feedback_at &&
                    !answer.accepted_at && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <AiOutlineFile className="grey" />
                        </div>
                      </button>
                    )
                )}

                {/* alteada apos feedback */}
                {data.answers.map(
                  answer =>
                    !answer.accepted_at &&
                    answer.feedback_at &&
                    new Date(answer.updated_at).getTime() >
                      new Date(answer.feedback_at).getTime() && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <AiOutlineFile className="grey" />
                          <MdFeedback className="yellow" />
                        </div>
                      </button>
                    )
                )}

                {/* resposta aceita */}
                {data.answers.map(
                  answer =>
                    answer.accepted_at && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <FaCheck className="green" />
                        </div>
                      </button>
                    )
                )}

                {/* resposta recusada, tarefa fechada */}
                {data.answers.map(
                  answer =>
                    !answer.accepted_at &&
                    new Date(answer.feedback_at).getTime() >
                      new Date(answer.updated_at).getTime() && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          {data.closed_at ? (
                            <AiOutlineCloseCircle className="red" />
                          ) : (
                            <MdFeedback className="yellow" />
                          )}
                        </div>
                      </button>
                    )
                )}
              </ul>
            </>
          )}
          <button
            className={`open-close ${
              isOpen ? "yellow-background" : "blue-background"
            }`}
            onClick={closeOrOpenTask}
          >
            {isOpen ? "Fechar Tarefa" : "Reabrir Tarefa"}
          </button>
        </div>
      )}
    </Container>
  );
}

export default Task;
