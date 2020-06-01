import React, { useState, useEffect } from "react";

import { Container } from "./styles";
import api from "../../../services/api";
import Discipline from "./Discipline";

function TeacherPage() {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    async function awaitDisciplines() {
      const response = await api.get(`/disciplines?teacher=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDisciplines(response.data);
    }
    awaitDisciplines();
  }, []);

  return (
    <Container>
      <h3>Suas disciplinas</h3>
      <ul>
        {disciplines.map(discipline => (
          <Discipline data={discipline} key={discipline.id} />
        ))}
      </ul>
    </Container>
  );
}

export default TeacherPage;
