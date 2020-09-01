import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../../services/api";
import Discipline from "./Discipline";
import CreateDiscipline from "./CreateDiscipline";
import useFetch from "../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function TeacherPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showCreateDiscipline, setShowCreateDiscipline] = useState(false);
  const userData = useSelector(state => state.userData);

  const { data: disciplines, mutate: mutateDisciplines } = useFetch({
    path: "/disciplines",
    params: { teacher: userData.id },
    dispatch,
    history,
  });

  async function reloadDisciplines() {
    const token = localStorage.getItem("token");
    const response = await api.get(`/disciplines?teacher=${userData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mutateDisciplines(response.data);
  }

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
          disciplines={disciplines}
          mutateDisciplines={mutateDisciplines}
        />
      )}
      <ul>
        {disciplines?.map(discipline => (
          <Discipline
            data={discipline}
            key={discipline.id}
            reloadDisciplines={reloadDisciplines}
          />
        ))}
      </ul>
    </Container>
  );
}

export default TeacherPage;
