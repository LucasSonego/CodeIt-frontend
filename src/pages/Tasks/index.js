import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import getUserData from "../../util/getUserData";

import { Container, TeacherPage } from "./styles";
import StudentPage from "./StudentPage";
import Discipline from "./Discipline";

function Tasks() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [disciplinesAndTasks, setDisciplinesAndTasks] = useState([]);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "tarefas",
    });

    async function awaitAsyncCalls() {
      const data = await getUserData({ dispatch, history, newtoken: true });

      setUserData(data.user);

      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDisciplinesAndTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    awaitAsyncCalls();
  }, [dispatch, history]);

  function updateTasks(disciplineId, taskData) {
    const updatedDisciplinesAndTasks = disciplinesAndTasks.map(discipline => {
      if (disciplineId === discipline.id) {
        let updatedDiscipline = { ...discipline };
        updatedDiscipline.tasks = [taskData, ...discipline.tasks];
        return updatedDiscipline;
      } else {
        return discipline;
      }
    });

    setDisciplinesAndTasks(Array.from(updatedDisciplinesAndTasks));
  }

  return !userData.name ? (
    <></>
  ) : (
    <Container>
      {userData.is_teacher ? (
        <TeacherPage>
          <h3>Suas disciplinas</h3>
          {disciplinesAndTasks.map(discipline => (
            <Discipline
              key={discipline.id}
              data={discipline}
              onNewTask={updateTasks}
            />
          ))}
        </TeacherPage>
      ) : (
        <StudentPage disciplinesAndTasks={disciplinesAndTasks} />
      )}
    </Container>
  );
}

export default Tasks;
