import React from "react";

import { Container } from "./styles";

function Task({ data }) {
  return (
    <Container>
      <span>TODO: tarefa</span>
      <span>{data.closed_at}</span>
    </Container>
  );
}

export default Task;
