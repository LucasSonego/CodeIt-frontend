import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
import { store } from "react-notifications-component";

import api from "../../../../services/api";
import NotificationBody from "../../../../components/Notification";
import {
  Container,
  StyledInput,
  StyledTextArea,
  StyledCheckBox,
} from "./styles";
import CodeEditor from "../../../../components/CodeEditor";
import pushToPage from "../../../../util/pushToPage";

function Task({ data, openTasks, setOpenTasks }) {
  const [expanded, setExpanded] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const [title, setTitle] = useState(data.title);

  const [newTitle, setNewTitle] = useState(data.title);
  const [titleError, setTitleError] = useState(false);
  const [newDescription, setNewDescription] = useState(data.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const [code, setCode] = useState("" + data.code);
  const [language, setLanguage] = useState("" + data.language);
  const [allowAnyLanguage, setAllowAnyLanguage] = useState(!data.language);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(!data.closed_at);

  const dispatch = useDispatch();
  const history = useHistory();

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
          message="Ocorreu um erro"
          description={`Não foi possível ${
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

  async function editTask() {
    if (!newTitle) {
      setTitleError(true);
    }
    if (!newDescription) {
      setDescriptionError(true);
    }

    if (!newTitle || !newDescription) {
      return;
    }

    if (!allowAnyLanguage && language === "null") {
      setError("Selecione uma linguagem ou marque a caixa acima");
      return;
    }

    const token = localStorage.getItem("token");

    let response;
    try {
      response = await api.put(
        `/tasks/${data.id}`,
        {
          title: newTitle,
          description: newDescription,
          code,
          language: allowAnyLanguage ? null : language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTitle(newTitle);
        setShowEditMenu(false);
        let content = (
          <NotificationBody
            type="success"
            message="Tarefa editada com sucesso"
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
    } catch (error) {
      let content = (
        <NotificationBody
          type="error"
          message="Ocorreu um erro"
          description={"Não foi possível editar esta tarefa"}
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
          <p>{title}</p>
          <div className="info">
            <span className="label">{isOpen ? "Aberta" : "Fechada"}</span>
            {data.answers ? (
              <span className="label">{`Respostas: ${data.answers.length}`}</span>
            ) : (
              <span className="label">Respostas: 0</span>
            )}
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
          {data.answers && data.answers.length > 0 && (
            <>
              <span className="label">Respostas:</span>
              <ul className="answers">
                {/* sem feedback */}
                {data.answers.map(
                  answer =>
                    !answer.feedback_at &&
                    !answer.accepted_at && (
                      <button
                        className="answer"
                        key={answer.id}
                        onClick={() =>
                          pushToPage({
                            page: `feedback/${answer.id}`,
                            dispatch,
                            history,
                          })
                        }
                      >
                        <div className="data">
                          <span className="label">{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}`}</p>
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
                      <button
                        className="answer"
                        key={answer.id}
                        onClick={() =>
                          pushToPage({
                            page: `feedback/${answer.id}`,
                            dispatch,
                            history,
                          })
                        }
                      >
                        <div className="data">
                          <span className="label">{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}`}</p>
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
                      <button
                        className="answer"
                        key={answer.id}
                        onClick={() =>
                          pushToPage({
                            page: `feedback/${answer.id}`,
                            dispatch,
                            history,
                          })
                        }
                      >
                        <div className="data">
                          <span className="label">{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}`}</p>
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
                      <button
                        className="answer"
                        key={answer.id}
                        onClick={() =>
                          pushToPage({
                            page: `feedback/${answer.id}`,
                            dispatch,
                            history,
                          })
                        }
                      >
                        <div className="data">
                          <span className="label">{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}`}</p>
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
          <div className="buttons">
            <button
              className="blue-background"
              onClick={() => setShowEditMenu(true)}
            >
              Editar Tarefa
            </button>
            <button
              className={`open-close ${
                isOpen ? "yellow-background" : "blue-background"
              }`}
              onClick={closeOrOpenTask}
            >
              {isOpen ? "Fechar Tarefa" : "Reabrir Tarefa"}
            </button>
          </div>

          {showEditMenu && (
            <div className="edit-task">
              <div className="row">
                <span className="label">Título</span>
                <StyledInput
                  value={newTitle}
                  onChange={event => setNewTitle(event.target.value)}
                  error={titleError}
                  onFocus={() => setTitleError(false)}
                />
              </div>
              <div className="row">
                <span className="label">Enunciado</span>
                <StyledTextArea
                  value={newDescription}
                  onChange={event => setNewDescription(event.target.value)}
                  error={descriptionError}
                  onFocus={() => setDescriptionError(false)}
                />
              </div>
              <div className="row">
                <span className="label">Linguagem e Código</span>
                <CodeEditor
                  initialValue={data.code}
                  value={code}
                  onChange={setCode}
                  language={language}
                  setLanguage={setLanguage}
                  allowLanguageSelection
                  height="200px"
                  width={
                    window.screen.availWidth < 1300
                      ? `${window.screen.availWidth - 94}px`
                      : "1146px"
                  }
                />
              </div>
              <div className="row">
                <StyledCheckBox
                  value={allowAnyLanguage}
                  onClick={() =>
                    allowAnyLanguage
                      ? setAllowAnyLanguage(false)
                      : setAllowAnyLanguage(true)
                  }
                >
                  {allowAnyLanguage ? (
                    <div className="box">
                      <FaCheck />
                    </div>
                  ) : (
                    <div className="box"></div>
                  )}
                  <span>Aceitar respostas em qualquer linguagem</span>
                </StyledCheckBox>
                <div className="error">{error}</div>
              </div>
              <div className="buttons">
                <button className="blue-background" onClick={editTask}>
                  Confirmar
                </button>

                <button
                  className="red-background"
                  onClick={() => setShowEditMenu(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Task;
