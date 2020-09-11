import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import { Container } from "./styles";
import api from "../../services/api";

export default function Home() {
  const dispatch = useDispatch();
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
    <Container>
      <div>
        <h2>HOME</h2>
        {user?.id ? (
          <div>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.is_teacher}</p>
          </div>
        ) : (
          <h3>OFFLINE</h3>
        )}
      </div>
    </Container>
  );
}
