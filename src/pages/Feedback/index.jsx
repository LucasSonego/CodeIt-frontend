import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Container } from "./styles";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";

function Feedback({ userData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "feedbacks",
    });
  }, [dispatch]);

  return (
    <Container>
      {userData?.id ? (
        userData?.is_teacher ? (
          <TeacherPage />
        ) : (
          <StudentPage />
        )
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Feedback;
