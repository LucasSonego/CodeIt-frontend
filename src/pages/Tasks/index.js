import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container, TeacherPage } from "./styles";
import StudentPage from "./StudentPage";
import Discipline from "./Discipline";
import useFetch from "../../hooks/useFetch";

function Tasks({ userData }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    data: disciplinesAndTasks,
    mutate: mutateDisciplinesAndTasks,
  } = useFetch({ path: "/tasks", dispatch, history });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "tarefas",
    });
  }, [dispatch]);

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

    mutateDisciplinesAndTasks(Array.from(updatedDisciplinesAndTasks));
  }

  return !userData?.name ? (
    <></>
  ) : (
    <Container>
      {userData.is_teacher ? (
        <TeacherPage>
          <h3>Suas disciplinas</h3>
          {disciplinesAndTasks?.map(discipline => (
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
