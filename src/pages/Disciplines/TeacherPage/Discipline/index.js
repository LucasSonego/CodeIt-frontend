import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { AiOutlineLoading3Quarters, AiOutlineWarning } from "react-icons/ai";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { store } from "react-notifications-component";

import { Container, DeleteButton } from "./styles";
import api from "../../../../services/api";
import NotificationBody from "../../../../components/Notification";
import TextField from "../../../../components/UI/TextField";

function Discipline(props) {
  const [disciplineData, setDisciplineData] = useState(props.data);
  const [showDetails, setShowDetails] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [newName, setNewName] = useState(disciplineData.name);
  const [newNameError, setNewNameError] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  async function getDetails() {
    const token = localStorage.getItem("token");
    const response = await api.get(`/disciplines?id=${props.data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDisciplineData(response.data);
  }

  async function toggleDetails() {
    if (showDetails) {
      setShowDetails(false);
    } else {
      setLoadingState(true);
      await getDetails();
      setShowDetails(true);
      setLoadingState(false);
    }
  }

  function handleDeleteClick() {
    deleteClicked ? deleteDiscipline() : setDeleteClicked(true);
  }

  function sendSuccessNotification(message) {
    const content = <NotificationBody type="success" message={message} />;
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

  async function deleteDiscipline() {
    const token = localStorage.getItem("token");
    let response;
    try {
      response = await api.delete(`/disciplines/${props.data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        sendSuccessNotification("Disciplina removida com sucesso");
        props.reloadDisciplines();
      }
    } catch (error) {
      props.reloadDisciplines();
    }
  }

  async function handleRename() {
    if (!newName) {
      setNewNameError(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/disciplines/${disciplineData.id}`,
        {
          name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDisciplineData({ ...disciplineData, name: newName });
        sendSuccessNotification("Disciplina renomeada com sucesso");
      }
    } catch (error) {
      props.reloadDisciplines();
    }
  }

  return (
    <Container>
      <div className="basicinfo">
        <div className="disciplinedata ">
          <span className="name">{disciplineData.name}</span>
          <span className="id">{disciplineData.id}</span>
        </div>

        <button onClick={() => toggleDetails()}>
          {showDetails ? (
            <MdExpandLess />
          ) : loadingState ? (
            <AiOutlineLoading3Quarters className="loading" />
          ) : (
            <MdExpandMore />
          )}
        </button>
      </div>
      {showDetails && disciplineData && (
        <div className="details">
          <div className="enrollments">
            <span className="enrollmentcount">
              Estudantes matriculados: {disciplineData.enrollments.length}
              {disciplineData.enrollments.length > 0 && (
                <button
                  onClick={() => {
                    showEnrollments
                      ? setShowEnrollments(false)
                      : setShowEnrollments(true);
                  }}
                >
                  {showEnrollments ? <MdExpandLess /> : <MdExpandMore />}
                </button>
              )}
            </span>
            {showEnrollments && (
              <ul className="enrollmentlist">
                {disciplineData.enrollments.map(enrollment => (
                  <li key={enrollment.student.id}>
                    <span className="studentdata name">
                      {enrollment.student.name}
                    </span>
                    <span className="studentdata id">
                      {enrollment.student.id}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span>Tarefas: {disciplineData.tasks.length}</span>
          <button
            className="toggleoptions"
            onClick={() =>
              showOptions ? setShowOptions(false) : setShowOptions(true)
            }
          >
            Opções {showOptions ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {showOptions && (
            <div className="options">
              <TextField
                className="textfieldcomponent"
                type="text"
                label="Renomear disciplina"
                value={newName}
                onChange={setNewName}
                error={newNameError}
                onFocus={() => setNewNameError(false)}
                style={{ color: "#555" }}
              />

              <div className="buttons">
                <button className="rename" onClick={() => handleRename()}>
                  <span>
                    <FiEdit />
                    Renomear
                  </span>
                </button>

                <DeleteButton
                  onClick={() => handleDeleteClick()}
                  confirmation={deleteClicked}
                >
                  {deleteClicked ? (
                    <span>
                      <AiOutlineWarning />
                      Clique para confirmar
                    </span>
                  ) : (
                    <span>
                      <FiTrash2 />
                      Remover disciplina
                    </span>
                  )}
                </DeleteButton>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Discipline;
