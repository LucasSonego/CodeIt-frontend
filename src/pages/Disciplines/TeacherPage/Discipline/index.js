import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Container } from "./styles";
import api from "../../../../services/api";

function Discipline(props) {
  const [disciplineDetails, setDisciplineDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

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
                  {showEnrollments ? (
                    <MdExpandLess />
                  ) : loadingState ? (
                    <AiOutlineLoading3Quarters className="loading" />
                  ) : (
                    <MdExpandMore />
                  )}
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
        </div>
      )}
    </Container>
  );
}

export default Discipline;
