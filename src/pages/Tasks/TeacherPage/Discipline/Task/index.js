import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";

import { Container } from "./styles";

function Task({ data }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <div className="header">
        <div>
          <p>{data.title}</p>
          <div className="info">
            <span>{!data.closed_at ? "Aberta" : "Fechada"}</span>
            <span>{`Respostas: ${data.answers.length}`}</span>
          </div>
        </div>
        <button
          onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
        >
          {expanded ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {expanded && (
        <div className="expanded">
          {data.answers.length > 0 && (
            <>
              <span>Respostas:</span>
              <ul className="answers">
                {/* sem feedback */}
                {data.answers.map(
                  answer =>
                    !answer.feedback_at &&
                    !answer.accepted_at && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <AiOutlineFile className="grey" />
                        </div>
                      </button>
                    )
                )}

                {/* alteada apos feedback */}
                {data.answers.map(
                  answer =>
                    !answer.accepted_at &&
                    answer.feedback_at &&
                    new Date(answer.updated_at).getTime() >
                      new Date(answer.feedback_at).getTime() && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <AiOutlineFile className="grey" />
                          <MdFeedback className="yellow" />
                        </div>
                      </button>
                    )
                )}

                {/* resposta aceita */}
                {data.answers.map(
                  answer =>
                    answer.accepted_at && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          <FaCheck className="green" />
                        </div>
                      </button>
                    )
                )}

                {/* resposta recusada, tarefa fechada */}
                {data.answers.map(
                  answer =>
                    !answer.accepted_at &&
                    new Date(answer.feedback_at).getTime() >
                      new Date(answer.updated_at).getTime() && (
                      <button className="answer" key={answer.id}>
                        <div className="data">
                          <span>{answer.student.name}</span>
                          <p>{`${new Date(
                            answer.updated_at
                          ).toLocaleDateString()}  ${new Date(
                            answer.updated_at
                          ).toLocaleTimeString()}`}</p>
                        </div>
                        <div className="icons">
                          {data.closed_at ? (
                            <AiOutlineCloseCircle className="red" />
                          ) : (
                            <MdFeedback className="yellow" />
                          )}
                        </div>
                      </button>
                    )
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default Task;
