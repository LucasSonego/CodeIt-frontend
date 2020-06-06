import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";
import getUserData from "../../util/getUserData";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";

function Disciplines() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "disciplinas",
    });
    async function awaitUserData() {
      const respose = await getUserData({ dispatch, history, newtoken: true });
      setUserData(respose);
    }
    awaitUserData();
  }, [dispatch, history]);

  return (
    <Container>
      {userData.user &&
        (userData.user.is_teacher ? <TeacherPage /> : <StudentPage />)}
    </Container>
  );
}

export default Disciplines;
