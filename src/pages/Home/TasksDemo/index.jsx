import React from "react";
import { FiCode } from "react-icons/fi";
import { FaCheck, FaRegCalendarTimes } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { AiOutlineFileExclamation, AiOutlineFileDone } from "react-icons/ai";

import { Container } from "./styles";
import studentPage from "../../../assets/demos/tasks-student.svg";

function TasksDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <FiCode /> <h2>Tarefas</h2>
      </div>
      {teacher ? (
        <></>
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
