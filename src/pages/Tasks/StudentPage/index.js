import React from "react";

import { Container } from "./styles";
import Task from "./Task";

function StudentPage({ disciplinesAndTasks }) {
  return (
    <Container>
      <h2>Tarefas</h2>
      <ul className="disciplines">
        {disciplinesAndTasks &&
          disciplinesAndTasks.map(discipline =>
            discipline.tasks.length > 0 ? (
              <li key={discipline.id} className="discipline">
                <h3>{discipline.name}</h3>
                <ul className="tasks">
                  {discipline.tasks.map(task => (
                    <li key={task.id}>
                      <Task data={task} />
                    </li>
                  ))}
                </ul>
              </li>
            ) : null
          )}
      </ul>
    </Container>
  );
}

export default StudentPage;
