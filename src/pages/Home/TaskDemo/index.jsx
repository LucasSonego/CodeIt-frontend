import React from "react";
import { FiCode } from "react-icons/fi";

import { Container } from "./styles";
import studentPage from "../../../assets/demos/task-student.svg";

function TaskDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <FiCode /> <h2>Tarefa</h2>
      </div>
      {teacher ? (
        <div className="teacher"></div>
      ) : (
        <div className="student">
          <img src={studentPage} alt="" srcset="" />
          <span className="tip">
            A caixa acima do editor de código exibe a linguagem a qual você deve
            utilizar para realizar a tarefa, caso definida pelo professor;
          </span>
          <span className="tip">
            É possível que uma tarefa aceite respostas em qualquer linguagem,
            neste caso você poderá selecionar a linguagem que deseja;
          </span>
        </div>
      )}
    </Container>
  );
}

export default TaskDemo;
