import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";

import { Container } from "./styles";
import Discipline from "./Discipline";

function Disciplines() {
  const [user, setUser] = useState({});
  const [disciplines, setDisciplines] = useState();
  const [enrolledDisciplines, setEnrolledDisciplines] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "disciplinas",
    });
    const token = localStorage.getItem("token");
    if (token) {
      const storageUser = localStorage.getItem("user");
      if (storageUser) {
        const parsedUser = JSON.parse(storageUser);
        setUser(parsedUser);
      } else {
        async function getUserData() {
          const response = await api.get("/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        }

        getUserData();
      }
    }
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
  }, [dispatch]);

  return (
    <Container>
      <h3>Disciplinas que você está matriculado</h3>
      <ul>
        {enrolledDisciplines &&
          enrolledDisciplines.map(discipline => (
            <Discipline data={discipline} enrolled="true" />
          ))}
      </ul>

      <h3>Outras disciplinas</h3>
      <ul>
        {disciplines &&
          disciplines.map(discipline => <Discipline data={discipline} />)}
      </ul>
    </Container>
  );
}

export default Disciplines;
