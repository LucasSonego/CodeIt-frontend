import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { Container } from "./styles";
import Task from "./Task";

function Discipline({ data }) {
  const [showTasks, setShowTasks] = useState(false);

  function countOpenTasks(discipline) {
    if (discipline.tasks.length > 0) {
      let total = 0;
      discipline.tasks.map(task => !task.closed_at && total++);
      return total;
    } else {
      return 0;
    }
  }

  return (
    <Container>
      <div className="header">
        <div className="disciplinedata">
          <div>
            <span className="name">{data.name}</span>
            <span className="id">{data.id}</span>
          </div>
          <span>Tarefas abertas: {countOpenTasks(data)}</span>
        </div>
        <button
          onClick={() => {
            showTasks ? setShowTasks(false) : setShowTasks(true);
          }}
        >
          {showTasks ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>

      {showTasks && (
        <>
          {data.tasks.length > 0 ? (
            <ul className="tasks">
              {data.tasks.map(
                task => !task.closed_at && <Task key={task.id} data={task} />
              )}
              {data.tasks.map(
                task => task.closed_at && <Task key={task.id} data={task} />
              )}
            </ul>
          ) : (
            <span className="notasks">Não há nenhuma tarefa</span>
          )}
        </>
      )}
    </Container>
  );
}

export default Discipline;
