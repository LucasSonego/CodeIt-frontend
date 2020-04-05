import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";

import { Container } from "./styles";

export default function Home() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "",
    });
    const token = localStorage.getItem("token");
    if (token) {
      const storageUser = localStorage.getItem("user");
      if (storageUser) {
        const parsedUser = JSON.parse(storageUser);
        setUser(parsedUser);
      } else {
        async function getUserData() {
          const response = await api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        }

        getUserData();
      }
    }
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
