import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
      page: "disciplinas  ",
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

  async function createEnrollment(discipline) {
    const token = localStorage.getItem("token");

    await api.post(
      `/enrollments/${discipline}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getDisciplines();
  }

  async function cancellEnrollment(discipline) {
    const token = localStorage.getItem("token");
    await api.delete(`/enrollments/${discipline}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getDisciplines();
  }

  return (
    <Container>
      <h3>Disciplinas que você está matriculado</h3>
      <ul>
        {enrolledDisciplines &&
          enrolledDisciplines.map(discipline => (
            <Discipline
              key={discipline.id}
              data={discipline}
              enrolled="true"
              buttonAction={() => cancellEnrollment(discipline.id)}
            />
          ))}
      </ul>

      <h3>Outras disciplinas</h3>
      <ul>
        {disciplines &&
          disciplines.map(discipline => (
            <Discipline
              key={discipline.id}
              data={discipline}
              buttonAction={() => createEnrollment(discipline.id)}
            />
          ))}
      </ul>
    </Container>
  );
}

export default Disciplines;
