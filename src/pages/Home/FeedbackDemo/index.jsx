import React from "react";
import { MdFeedback } from "react-icons/md";

import { Container } from "./styles";
import studentPage from "../../../assets/demos/feedback-student.svg";
import teacherPage from "../../../assets/demos/feedback-teacher.svg";

function FeedbackDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <MdFeedback /> <h2>Feedback</h2>
      </div>
      {teacher ? (
        <div className="teacher">
          <img src={teacherPage} alt="" srcSet="" />
          <span className="tip">
            Esta é a página de avaliação de respostas;
          </span>
          <span className="tip">
            É possível fazer alterações no código, e o aluno poderá ver as
            alterações feitas;
          </span>
          <span className="tip">
            Alem disso você pode enviar um feedback em texto;
          </span>
          <span className="tip">
            Caso a resposta não seja aceita o aluno pode alterá-la se a tarefa
            ainda estiver aberta;
          </span>
          <span className="tip">
            Caso o aluno altere a resposta, será exibida a data da ultima
            alteração acima do editor de código;
          </span>
        </div>
      ) : (
        <div className="student">
          <img src={studentPage} alt="" srcSet="" />
          <span className="tip">
            Esta página exibe a avaliação feita pelo professor;
          </span>
          <span className="tip">
            Caso o professor tenha alterado o código da sua resposta, serão
            exibidas as alterações feitas;
          </span>
          <span className="tip">
            Alem de alterações no código também pode haver um comentário;
          </span>
          <span className="tip">
            O professor pode aceitar ou não aceitar a sua resposta;
          </span>
        </div>
      )}
    </Container>
  );
}

export default FeedbackDemo;
