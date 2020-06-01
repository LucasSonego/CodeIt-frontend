import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import NotificationBody from "../../../components/Notification";
import { FiPlusCircle } from "react-icons/fi";

import api from "../../../services/api";

import { Container } from "./styles";
import Discipline from "./Discipline";

function StudentPage() {
  const [disciplines, setDisciplines] = useState([]);
  const [enrolledDisciplines, setEnrolledDisciplines] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getDisciplines() {
      const response = await api.get("/disciplines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDisciplines(response.data.disciplines);
      setEnrolledDisciplines(response.data.enrolled_disciplines);
    }
    getDisciplines();
  }, [dispatch, history]);

  function sendNotification(content) {
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

  async function manageEnrollment(action, discipline, setLoadingState) {
    setLoadingState(true);
    const token = localStorage.getItem("token");

    let response;

    if (action === "create") {
      response = await api.post(
        `/enrollments/${discipline}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (action === "remove") {
      response = await api.delete(`/enrollments/${discipline}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (response.status === 200) {
      const content = (
        <NotificationBody
          type="success"
          description={`Matrícula ${
            action === "create" ? "efetuada" : "removida"
          } com sucesso`}
        />
      );
      sendNotification(content);
    } else {
      const content = (
        <NotificationBody
          type="error"
          description={`Não foi possivel ${
            action === "create" ? "efetuada" : "removida"
          } sua matrícula`}
        />
      );
      sendNotification(content);
    }

    response = await api.get("/disciplines", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoadingState(false);
    setDisciplines(response.data.disciplines);
    setEnrolledDisciplines(response.data.enrolled_disciplines);
  }

  return (
    <Container>
      <div className="disciplines">
        <div className="enrolleddisciplines">
          <h3>Disciplinas que você está matriculado</h3>
          <ul>
            {enrolledDisciplines &&
              enrolledDisciplines.map(discipline => (
                <Discipline
                  key={discipline.id}
                  data={discipline}
                  enrolled="true"
                  buttonAction={manageEnrollment}
                />
              ))}
            {enrolledDisciplines.length === 0 && (
              <div className="noenrolleddisciplines">
                <span>
                  Você ainda não está matriculado em nenhuma disciplina
                  <br />
                  Para efetuar sua matricula em uma disciplina clique no
                </span>
                <FiPlusCircle />
              </div>
            )}
          </ul>
        </div>
        <div className="otherdisciplines">
          <h3>Outras disciplinas</h3>
          <ul>
            {disciplines &&
              disciplines.map(discipline => (
                <Discipline
                  key={discipline.id}
                  data={discipline}
                  buttonAction={manageEnrollment}
                />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default StudentPage;
