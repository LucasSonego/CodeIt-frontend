import React from "react";
import { FiCode } from "react-icons/fi";
import { FaCheck, FaRegCalendarTimes } from "react-icons/fa";
import { MdFeedback, MdExpandMore } from "react-icons/md";
import { AiOutlineFileExclamation, AiOutlineFileDone } from "react-icons/ai";

import { Container } from "./styles";
import studentPage from "../../../assets/demos/tasks-student.svg";
import teacherPage from "../../../assets/demos/tasks-teacher.svg";

function TasksDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <FiCode /> <h2>Tarefas</h2>
      </div>
      {teacher ? (
        <div className="teacher">
          <img src={teacherPage} alt="" srcset="" />
          <span className="tip">As tarefas são separadas por disciplinas;</span>
          <span className="tip">
            Para ver as tarefas de uma disciplina basta clicar em "
            <MdExpandMore className="icon" />" para expandir o painel;
          </span>
          <span className="tip">
            A tarefa também pode ser expandida, onde serão listados os
            estudantes que enviaram uma resposta para esta tarefa e algumas
            opções;
          </span>
          <span className="tip">
            Para criar uma tarefa clique em "Criar nova tarefa" dentro da
            disciplina que deseja, o painel de criação de tarefa irá se
            expandir;
          </span>
        </div>
      ) : (
        <div className="student">
          <img src={studentPage} alt="" />
          <span className="tip">
            Suas tarefas são separadas por disciplina e alguns ícones serão
            exibidos à direita de cada tarefa:
          </span>
          <div className="icon-tips">
            <span className="tip">
              <AiOutlineFileDone className="icon grey" />: Resposta enviada
              ainda não foi avaliada;
            </span>
            <span className="tip">
              <FaCheck className="icon green" />: A resposta enviada foi aceita;
            </span>
            <span className="tip">
              <AiOutlineFileExclamation className="icon yellow" />: A resposta
              enviada não foi aceita;
            </span>
            <span className="tip">
              <MdFeedback className="icon green" /> /{" "}
              <MdFeedback className="icon yellow" />: Feedback disponível (que
              pode ser visto na página de feedbacks);
            </span>
            <span className="tip">
              <FaRegCalendarTimes className="icon red" />: A tarefa foi fechada
              e você não enviou uma resposta;
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}

export default TasksDemo;
