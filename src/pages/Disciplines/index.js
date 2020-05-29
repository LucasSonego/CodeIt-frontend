import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import getUserData from "../../util/getUserData";
import DisciplinesList from "./StudentPage";

// import { Container } from './styles';

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
    <>
      {userData.user &&
        (userData.user.is_teacher ? (
          <h3>teacher page</h3>
        ) : (
          <DisciplinesList />
        ))}
    </>
  );
}

export default Disciplines;
