import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import useFetch from "../../hooks/useFetch";

function Disciplines() {
  const dispatch = useDispatch();
  const history = useHistory();

  useFetch({
    path: "/sessions",
    params: { newtoken: true },
    dispatch,
    history,
  });

  const userData = useSelector(state => state.userData);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "disciplinas",
    });
  }, [dispatch]);

  return (
    <Container>
      {userData?.is_teacher ? <TeacherPage /> : <StudentPage />}
    </Container>
  );
}

export default Disciplines;
