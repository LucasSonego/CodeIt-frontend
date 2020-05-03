import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import getUserData from "../../util/getUserData";

import { Container, UserData } from "./styles";
import UserDataContainer from "./UserDataContainer";
import ChangePassword from "./ChangePassword";

export default function User() {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function awaitUserData() {
      const data = await getUserData({
        dispatch,
        history,
        newtoken: true,
      });

      if (data) {
        setUserData(data.user);
      }
    }

    awaitUserData();

    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "dados",
    });
  }, [dispatch, history]);

  return (
    <Container>
      <UserData>
        <UserDataContainer userData={userData} setUserData={setUserData} />
        <ChangePassword />
      </UserData>
    </Container>
  );
}
