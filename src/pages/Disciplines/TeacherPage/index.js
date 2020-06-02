import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../../services/api";
import Discipline from "./Discipline";
import CreateDiscipline from "./CreateDiscipline";

function TeacherPage() {
  const [disciplines, setDisciplines] = useState([]);
  const [showCreateDiscipline, setShowCreateDiscipline] = useState(false);

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
      <div className="header">
        <h3>Suas disciplinas</h3>
        <button onClick={() => setShowCreateDiscipline(true)}>
          <FiPlusCircle />
        </button>
      </div>
      {showCreateDiscipline && (
        <CreateDiscipline
          hideComponent={() => setShowCreateDiscipline(false)}
          disciplineList={{
            disciplines: disciplines,
            setDisciplines: setDisciplines,
          }}
        />
      )}
      <ul>
        {disciplines.map(discipline => (
          <Discipline data={discipline} key={discipline.id} />
        ))}
      </ul>
    </Container>
  );
}

export default TeacherPage;
