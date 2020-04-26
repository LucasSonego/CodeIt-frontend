import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiUser, FiBook, FiCode, FiLogOut } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";

import logo from "../../../assets/logo.svg";

import { Container, NavItem } from "./styles";
import pushToPage from "../../../util/pushToPage";

function getUserName() {
  const userLocalStorage = localStorage.getItem("user");
  if (userLocalStorage) {
    const user = JSON.parse(userLocalStorage);
    const [username] = user.name.split(" ");
    return username;
  } else {
    return "?";
  }
}

export default function NavBar() {
  const currentPage = useSelector(state => state.currentPage);
  const dispatch = useDispatch();
  const history = useHistory();

  const username = getUserName();

  return (
    <Container
      className="navBar"
      visible={
        currentPage !== "cadastro" &&
        currentPage !== "login" &&
        currentPage !== "404"
      }
    >
      <ul>
        <NavItem key="home" currentPage={currentPage === ""}>
          <button
            onClick={() => {
              if (currentPage !== "") {
                pushToPage({ page: "", dispatch, history });
              }
            }}
          >
            <img src={logo} alt="codeit" />
            <span>Code It</span>
          </button>
        </NavItem>
        <NavItem key="dados" currentPage={currentPage === "dados"}>
          <button
            onClick={() => {
              if (currentPage !== "dados") {
                pushToPage({ page: "dados", dispatch, history });
              }
            }}
          >
            <FiUser />
            <span>{username}</span>
          </button>
        </NavItem>
        <NavItem key="disciplinas" currentPage={currentPage === "disciplinas"}>
          <button
            onClick={() => {
              if (currentPage !== "disciplinas") {
                pushToPage({ page: "disciplinas", dispatch, history });
              }
            }}
          >
            <FiBook />
            <span>Disciplinas</span>
          </button>
        </NavItem>
        <NavItem key="tarefas" currentPage={currentPage === "tarefas"}>
          <button
            onClick={() => {
              if (currentPage !== "tarefas") {
                pushToPage({ page: "tarefas", dispatch, history });
              }
            }}
          >
            <FiCode />
            <span>Tarefas</span>
          </button>
        </NavItem>
        <NavItem key="feedbacks" currentPage={currentPage === "feedbacks"}>
          <button
            onClick={() => {
              if (currentPage !== "feedbacks") {
                pushToPage({ page: "feedbacks", dispatch, history });
              }
            }}
          >
            <MdFeedback />
            <span>Feedbacks</span>
          </button>
        </NavItem>
        <NavItem key="logout">
          <button
            onClick={() => {
              localStorage.clear();
              pushToPage({ page: "login", dispatch, history });
            }}
          >
            <FiLogOut />
            <span>Sair</span>
          </button>
        </NavItem>
      </ul>
    </Container>
  );
}
