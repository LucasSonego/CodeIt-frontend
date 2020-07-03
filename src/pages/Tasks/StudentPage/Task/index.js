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
                <FaCheck className="green" /> <MdFeedback className="green" />
              </>
            ) : (
              <FaCheck className="green" />
            )
          ) : data.answer.feedback || data.answer.feedback_code ? (
            new Date(data.answer.updated_at).getTime() >
            new Date(data.answer.feedback_at).getTime() ? (
              <>
                <AiOutlineFileDone className="grey" />
                <MdFeedback className="yellow" />
              </>
            ) : (
              <>
                <AiOutlineFileExclamation className="yellow" />
                <MdFeedback className="yellow" />
              </>
            )
          ) : (
            !data.answer.accepted_at && <AiOutlineFileDone className="grey" />
          )
        ) : (
          data.closed_at && <FaRegCalendarTimes className="red" />
        )}
      </div>
    </Container>
  );
}

export default Task;
