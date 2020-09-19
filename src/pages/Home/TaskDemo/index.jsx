import React from "react";
import { FiCode } from "react-icons/fi";

import { Container } from "./styles";
import teacherPage from "../../../assets/demos/task-teacher.svg";
import studentPage from "../../../assets/demos/task-student.svg";

function TaskDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <FiCode /> <h2>Tarefa</h2>
      </div>
      {teacher ? (
        <div className="teacher">
          <img src={teacherPage} alt="" srcset="" />
          <span className="tip">
            Ao clicar em "Criar nova tarefa" o painel de criação de tarefa irá
            se expandir;
          </span>
          <span className="tip">
            As tarefas devem conter um título e um enunciado;
          </span>
          <span className="tip">
            Você pode especificar uma linguagem para a tarefa ou optar por
            aceitar respostas em qualquer linguagem;
          </span>
          <span className="tip">
            (Opcional) É possível também enviar um trecho de código na tarefa
            (mesmo que a tarefa aceite respostas em qualquer linguagem);
          </span>
        </div>
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
