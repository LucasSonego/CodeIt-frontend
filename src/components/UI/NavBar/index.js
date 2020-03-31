import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiUser, FiBook, FiCode, FiLogOut } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";

import logo from "../../../assets/logo.svg";

import { Container, NavItem } from "./styles";

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

  function setCurrentPage(page) {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page
    });

    history.push(`/${page}`);
  }

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
                setCurrentPage("");
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
                setCurrentPage("dados");
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
                setCurrentPage("disciplinas");
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
                setCurrentPage("tarefas");
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
                setCurrentPage("feedbacks");
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
              history.push("/login");
              dispatch({
                type: "SET_CURRENT_PAGE",
                page: "login"
              });
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
