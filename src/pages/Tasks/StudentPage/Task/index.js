import React from "react";
import { useHistory } from "react-router-dom";
// import { FaCheck, FaRegCalendarTimes } from "react-icons/fa";
// import { MdFeedback } from "react-icons/md";
// import { AiOutlineFileExclamation } from "react-icons/ai";
// import { BsFileEarmarkCheck } from "react-icons/bs";

import { Container } from "./styles";

function Task({ data }) {
  const history = useHistory();

  function handleRedirect() {
    history.push(`/tarefas/${data.id}`);
  }

  return (
    <Container onClick={handleRedirect}>
      <div className="title">{data.title}</div>
      <div className="info"></div>
    </Container>
  );
}

export default Task;
