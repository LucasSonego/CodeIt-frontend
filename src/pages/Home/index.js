import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import { Container } from "./styles";
import api from "../../services/api";
import logo from "../../assets/logocodeit.svg";
import DisciplinesDemo from "./DisciplinesDemo";
import TasksDemo from "./TasksDemo";
import TaskDemo from "./TaskDemo";
import FeedbacksDemo from "./FeedbacksDemo";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.userData);

  useSWR("/sessions", async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.get("/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "SET_USER_DATA",
        userData: response.data.user,
      });

      return response.data;
    } catch (_) {}
  });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "",
    });
  }, [dispatch]);

  return (
    <Container navBarMargin={!!user?.id}>
      <section className="welcome">
        <div className="image">
          <img src={logo} alt="Code It!" />
        </div>
        <h1>Bem vindo ao CodeIt!</h1>
        {user?.id ? (
          <div className="user-data">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ) : (
          <>
            <h2>Faça login ou crie sua conta para utilizar esta plataforma</h2>
            <div>
              <button onClick={() => history.push("/login")}>Login</button>
              <button onClick={() => history.push("/cadastro")}>
                Cadastro
              </button>
            </div>
          </>
        )}
      </section>
      <section className="disciplines">
        <DisciplinesDemo teacher={user?.is_teacher} />
      </section>
      <section className="tasks">
        <TasksDemo teacher={user?.is_teacher} />
      </section>
      <section className="task">
        <TaskDemo teacher={user?.is_teacher} />
      </section>
      <section className="feedbacks">
        <FeedbacksDemo teacher={user?.is_teacher} />
      </section>
    </Container>
  );
}
