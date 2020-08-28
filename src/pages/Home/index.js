import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "./styles";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.userData);
  useFetch({
    path: "/sessions",
    params: { newtoken: true },
    dispatch,
    history,
  });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "",
    });
  }, [dispatch]);

  return (
    <Container>
      <div>
        {user && (
          <div>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.is_teacher}</p>
          </div>
        )}
      </div>
    </Container>
  );
}
