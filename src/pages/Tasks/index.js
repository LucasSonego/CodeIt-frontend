import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import getUserData from "../../util/getUserData";

import { Container } from "./styles";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";

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

  return !userData.name ? (
    <></>
  ) : (
    <Container>
      {userData.is_teacher ? (
        <TeacherPage disciplinesAndTasks={disciplinesAndTasks} />
      ) : (
        <StudentPage disciplinesAndTasks={disciplinesAndTasks} />
      )}
    </Container>
  );
}

export default Tasks;
