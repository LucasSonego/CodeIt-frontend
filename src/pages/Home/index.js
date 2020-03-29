import React, { useEffect, useState } from "react";
import api from "../../services/api";
import NavBar from "../../components/UI/NavBar";

import { Container } from "./styles";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
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
              Authorization: `Bearer ${token}`
            }
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        }

        getUserData();
      }
    }
  }, []);

  return (
    <>
      <NavBar currentPage="home" />
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
    </>
  );
}
