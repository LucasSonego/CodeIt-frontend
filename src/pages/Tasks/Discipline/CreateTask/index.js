import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { store } from "react-notifications-component";

import api from "../../../../services/api";

import {
  Container,
  StyledInput,
  StyledTextArea,
  StyledCheckBox,
} from "./styles";
import CodeEditor from "../../../../components/UI/CodeEditor";
import NotificationBody from "../../../../components/Notification";

function CreateTask({ disciplineId, onNewTask }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [allowAnyLanguage, setAllowAnyLanguage] = useState(false);
  const [error, setError] = useState("");

  async function createTask() {
    if (!title) {
      setTitleError(true);
      setError("Preencha os campos marcados");
    }

    if (!description) {
      setDescriptionError(true);
      setError("Preencha os campos marcados");
    }

    if (!title || !description) {
      return;
    }

    if (!allowAnyLanguage && !language) {
      setError("Selecione uma linguagem ou marque a caixa acima");
      return;
    }

    let taskLanguage;
    taskLanguage = allowAnyLanguage ? null : language;

    setError("");
    const token = localStorage.getItem("token");

    let response;
    try {
      response = await api.post(
        `/tasks/${disciplineId}`,
        {
          title,
          description,
          code,
          language: taskLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const content = (
          <NotificationBody
            type="success"
            message="Tarefa criada com sucesso"
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
        setExpanded(false);
        onNewTask(disciplineId, response.data);
      }
    } catch (error) {
      const content = (
        <NotificationBody
          type="error"
          message="Ocorreu um erro"
          description="Não foi possivel criar a tarefa"
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
      <button className="expand-button" onClick={() => setExpanded(true)}>
        <span>Criar nova tarefa</span>
        <FiPlusCircle />
      </button>
      {expanded && (
        <div className="input-fields">
          <div className="task-title">
            <span className="label">Título</span>
            <StyledInput
              type="text"
              className="title-input"
              value={title}
              onChange={event => setTitle(event.target.value)}
              error={titleError}
              onFocus={() => setTitleError(false)}
            />
          </div>

          <div className="task-description">
            <span className="label">Enunciado</span>
            <StyledTextArea
              className="description-input"
              rows="4"
              value={description}
              onChange={event => setDescription(event.target.value)}
              error={descriptionError}
              onFocus={() => setDescriptionError(false)}
            />
          </div>
          <div className="code-input">
            <span className="label">Linguagem e Código</span>
            <CodeEditor
              initialValue={""}
              value={code}
              onChange={setCode}
              height="300px"
              width={
                window.screen.availWidth < 1300
                  ? `${window.screen.availWidth - 90}px`
                  : "1148px"
              }
              language={language}
              setLanguage={setLanguage}
              allowLanguageSelection
            />
          </div>

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
          <p className="error">{error}</p>
          <div className="buttons">
            <button className="create" onClick={createTask}>
              Criar Tarefa
            </button>
            <button className="cancel" onClick={() => setExpanded(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CreateTask;
