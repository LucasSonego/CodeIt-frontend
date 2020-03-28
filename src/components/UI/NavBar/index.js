import React from "react";
import { Link } from "react-router-dom";

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

export default function NavBar(props) {
  const username = getUserName();

  return (
    <Container>
      <ul>
        <NavItem key="homepage">
          <Link to="/" className="navLink">
            <img src={logo} alt="codeit" />
            <span>Code It</span>
          </Link>
        </NavItem>
        <NavItem key="user" currentPage={props.currentPage === "user"}>
          <Link to="/dados" className="navLink">
            <FiUser />
            <span>{username}</span>
          </Link>
        </NavItem>
        <NavItem
          key="disciplines"
          currentPage={props.currentPage === "disciplines"}
        >
          <Link to="/disciplinas" className="navLink">
            <FiBook />
            <span>Disciplinas</span>
          </Link>
        </NavItem>
        <NavItem key="tasks" currentPage={props.currentPage === "tasks"}>
          <Link to="/tarefas" className="navLink">
            <FiCode />
            <span>Tarefas</span>
          </Link>
        </NavItem>
        <NavItem
          key="feedbacks"
          currentPage={props.currentPage === "feedbacks"}
        >
          <Link to="/feedbacks" className="navLink">
            <MdFeedback />
            <span>Feedbacks</span>
          </Link>
        </NavItem>
        <NavItem key="logout">
          <Link to="/login" className="navLink">
            <FiLogOut />
            <span>Sair</span>
          </Link>
        </NavItem>
      </ul>
    </Container>
  );
}
