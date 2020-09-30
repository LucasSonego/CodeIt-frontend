import React from "react";
import { useHistory } from "react-router-dom";
import { FaCheck, FaRegCalendarTimes } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { AiOutlineFileExclamation, AiOutlineFileDone } from "react-icons/ai";

import { Container } from "./styles";

function Task({ data }) {
  const history = useHistory();

  function handleRedirect() {
    history.push(`/tarefas/${data.id}`);
  }

  return (
    <Container onClick={handleRedirect}>
      <div className="title">{data.title}</div>
      <div className="info">
        {data.answer ? (
          data.answer.accepted_at ? (
            data.answer.feedback || data.answer.feedback_code ? (
              <>
                <FaCheck className="green" title="Resposta aceita" />
                <MdFeedback className="green" title="Feedback disponível" />
              </>
            ) : (
              <FaCheck className="green" title="Resposta aceita" />
            )
          ) : data.answer.feedback_at ? (
            new Date(data.answer.updated_at).getTime() >
            new Date(data.answer.feedback_at).getTime() ? (
              <>
                <AiOutlineFileDone className="grey" title="Resposta alterada" />
                <MdFeedback className="yellow" title="Feedback disponível" />
              </>
            ) : (
              <>
                <AiOutlineFileExclamation
                  className="yellow"
                  title="Sua resposta não foi aceita"
                />
                {(!!data.answer.feedback || !!data.answer.feedback_code) && (
                  <MdFeedback className="yellow" title="Feedback disponível" />
                )}
              </>
            )
          ) : (
            !data.answer.accepted_at && (
              <AiOutlineFileDone className="grey" title="Resposta enviada" />
            )
          )
        ) : (
          data.closed_at && (
            <FaRegCalendarTimes
              className="red"
              title="A tarefa ja foi fechada e você não enviou uma resposta"
            />
          )
        )}
      </div>
    </Container>
  );
}

export default Task;
