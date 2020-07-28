import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";
import StudentPage from "./StudentPage";
import getUserData from "../../util/getUserData";
import pushToPage from "../../util/pushToPage";
import TeacherPage from "./TeacherPage";

function Feedback() {
  const empty = { empty: true };
  const [userData, setUserData] = useState(empty);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "feedbacks",
    });

    async function awaitAsyncCalls() {
      try {
        const response = await getUserData({
          dispatch,
          history,
          newtoken: true,
        });
        if (response) {
          setUserData(response.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          pushToPage({ page: "tarefas", dispatch, history });
        }
      }
    }

    awaitAsyncCalls();
  }, [dispatch, history]);

  return (
    <Container>
      {userData === empty ? (
        <></>
      ) : (
        <>{userData.is_teacher ? <TeacherPage /> : <StudentPage />}</>
      )}
    </Container>
  );
}

export default Feedback;
