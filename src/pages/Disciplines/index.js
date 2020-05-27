import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import NotificationBody from "../../components/Notification";

import api from "../../services/api";

import { Container } from "./styles";
import getUserData from "../../util/getUserData";
import Discipline from "./Discipline";

function Disciplines() {
  const [disciplines, setDisciplines] = useState();
  const [enrolledDisciplines, setEnrolledDisciplines] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "disciplinas",
    });
    async function awaitUserData() {
      await getUserData({
        dispatch,
        history,
        newtoken: true,
      });
    }

    awaitUserData();
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

  async function getDisciplines() {
    const token = localStorage.getItem("token");
    const response = await api.get("/disciplines", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDisciplines(response.data.disciplines);
    setEnrolledDisciplines(response.data.enrolled_disciplines);
  }

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

  async function createEnrollment(discipline, setLoadingState) {
    setLoadingState(true);
    const token = localStorage.getItem("token");

    const response = await api.post(
      `/enrollments/${discipline}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await getDisciplines();
    setLoadingState(false);
    if (response.status === 200) {
      const content = (
        <NotificationBody
          type="success"
          description="Matrícula efetuada com sucesso"
        />
      );
      sendNotification(content);
    } else {
      const content = (
        <NotificationBody
          type="error"
          description="Não foi possivel efetuar sua matrícula"
        />
      );
      sendNotification(content);
    }
  }

  async function cancellEnrollment(discipline, setLoadingState) {
    setLoadingState(true);
    const token = localStorage.getItem("token");
    const response = await api.delete(`/enrollments/${discipline}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getDisciplines();
    setLoadingState(false);

    if (response.status === 200) {
      const content = (
        <NotificationBody
          type="success"
          description="Matrícula removida com sucesso"
        />
      );
      sendNotification(content);
    } else {
      const content = (
        <NotificationBody
          type="error"
          description="Não foi possivel remover sua matrícula"
        />
      );
      sendNotification(content);
    }
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
                  buttonAction={cancellEnrollment}
                />
              ))}
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
                  buttonAction={createEnrollment}
                />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Disciplines;
