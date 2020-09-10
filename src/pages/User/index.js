import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Container, UserData } from "./styles";
import UserDataContainer from "./UserDataContainer";
import ChangePassword from "./ChangePassword";
import useFetch from "../../hooks/useFetch";

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cacheData = useSelector(state => state.userData);

  const { data, mutate: mutateUserData } = useFetch({
    path: "/sessions",
    params: { newtoken: true },
    dispatch,
    history,
  });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "dados",
    });
  }, [dispatch, history]);

  return (
    <Container>
      <UserData>
        <UserDataContainer
          data={data ? data : { user: cacheData }}
          mutateData={mutateUserData}
        />
        <ChangePassword />
      </UserData>
    </Container>
  );
}
