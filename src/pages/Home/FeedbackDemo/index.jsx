import React from "react";
import { MdFeedback } from "react-icons/md";

import { Container } from "./styles";
import studentPage from "../../../assets/demos/feedback-student.svg";

function FeedbackDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <MdFeedback /> <h2>Feedback</h2>
      </div>
      {teacher ? (
        <div className="teacher"></div>
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
