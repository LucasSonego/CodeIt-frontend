import React from "react";
import { FiPlusCircle, FiMinusCircle, FiBook } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";

import { Container } from "./styles";
import teacherPage from "../../../assets/demos/disciplines-teacher.svg";
import studentPage from "../../../assets/demos/disciplines-student.svg";

function DisciplinesDemo({ teacher }) {
  return (
    <Container>
      {teacher ? (
        <div className="teacher">
          <div className="title">
            <FiBook /> <h2>Disciplinas</h2>
          </div>

          <img src={teacherPage} alt="" srcSet="" />
          <span className="tip">
            Para criar uma disciplina basta clicar no "
            <FiPlusCircle className="icon" />" que o painel de criação de
            disciplinas será exibido;
          </span>
          <span className="tip">
            As suas disciplinas serão listadas e para ver mais informações de
            uma disciplina clique em "
            <MdExpandMore className="icon" />
            ";
          </span>
        </div>
      ) : (
        <div className="student">
          <div className="title">
            <FiBook /> <h2>Disciplinas</h2>
          </div>
          <img src={studentPage} alt="" srcSet="" />
          <span className="tip">
            Para se matricular em uma disciplina basta clicar em "
            <FiPlusCircle className="icon" />
            ";
          </span>
          <span className="tip">
            Caso não queira mais participar de uma disciplina basta clicar em "
            <FiMinusCircle className="icon" />"
          </span>
        </div>
      )}
    </Container>
  );
}

export default DisciplinesDemo;
