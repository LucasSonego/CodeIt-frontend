import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import getUserData from "../../util/getUserData";

import { Container } from "./styles";
import StudentPage from "./StudentPage";

function Tasks() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [disciplineTasks, setDisciplineTasks] = useState([]);

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

        setDisciplineTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    awaitAsyncCalls();
  }, [dispatch, history]);

  return (
    <Container>
      {userData.is_teacher ? (
        <h2>Teacher</h2>
      ) : (
        <StudentPage disciplineTasks={disciplineTasks} />
      )}
    </Container>
  );
}

export default Tasks;
