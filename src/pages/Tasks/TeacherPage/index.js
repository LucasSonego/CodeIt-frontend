import React from "react";

import { Container } from "./styles";
import Discipline from "./Discipline";

function TeacherPage({ disciplinesAndTasks }) {
  return (
    <Container>
      <h3>Suas disciplinas</h3>
      {disciplinesAndTasks.map(discipline => (
        <Discipline key={discipline.id} data={discipline} />
      ))}
    </Container>
  );
}

export default TeacherPage;
