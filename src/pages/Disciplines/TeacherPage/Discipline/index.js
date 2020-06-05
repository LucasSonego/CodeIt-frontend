import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { AiOutlineLoading3Quarters, AiOutlineWarning } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { store } from "react-notifications-component";

import { Container, DeleteButton } from "./styles";
import api from "../../../../services/api";
import NotificationBody from "../../../../components/Notification";

function Discipline(props) {
  const [disciplineDetails, setDisciplineDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [deleteCilcked, setDeleteCilcked] = useState(false);

  async function getDetails() {
    const token = localStorage.getItem("token");
    const response = await api.get(`/disciplines?id=${props.data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDisciplineDetails(response.data);
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
    deleteCilcked ? deleteDiscipline() : setDeleteCilcked(true);
  }

  function sendSuccessNotification() {
    const content = (
      <NotificationBody
        type="success"
        message="Disciplina removida com sucesso"
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
        sendSuccessNotification();
        props.reloadDisciplines();
      }
    } catch (error) {
      props.reloadDisciplines();
    }
  }
  return (
    <Container>
      <div className="basicinfo">
        <div className="disciplinedata ">
          <span className="name">{props.data.name}</span>
          <span className="id">{props.data.id}</span>
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
      {showDetails && disciplineDetails && (
        <div className="details">
          <div className="enrollments">
            <span className="enrollmentcount">
              Estudantes matriculados: {disciplineDetails.enrollments.length}
              {disciplineDetails.enrollments.length > 0 && (
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
                {disciplineDetails.enrollments.map(enrollment => (
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
          <span>Tarefas: {disciplineDetails.tasks.length}</span>
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
              <DeleteButton
                onClick={() => handleDeleteClick()}
                confirmation={deleteCilcked}
              >
                {deleteCilcked ? (
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
          )}
        </div>
      )}
    </Container>
  );
}

export default Discipline;
