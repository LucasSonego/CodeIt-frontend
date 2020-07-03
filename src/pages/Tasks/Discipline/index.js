import React, { useState, useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { Container } from "./styles";
import Task from "./Task";
import CreateTask from "./CreateTask";

function Discipline({ data, onNewTask }) {
  const [showTasks, setShowTasks] = useState(false);
  const [openTasks, setOpenTasks] = useState();

  useEffect(() => {
    let total;
    if (data.tasks.length > 0) {
      total = 0;
      data.tasks.map(task => !task.closed_at && total++);
    }
    setOpenTasks(total);
  }, [data.tasks]);

  return (
    <Container>
      <div className="header">
        <div className="disciplinedata">
          <div>
            <span className="name">{data.name}</span>
            <span className="id">{data.id}</span>
          </div>
          <span>Tarefas abertas: {openTasks || "0"}</span>
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
          <CreateTask disciplineId={data.id} onNewTask={onNewTask} />
          {data.tasks.length > 0 ? (
            <ul className="tasks">
              {data.tasks.map(
                task =>
                  !task.closed_at && (
                    <Task
                      key={task.id}
                      data={task}
                      openTasks={openTasks}
                      setOpenTasks={setOpenTasks}
                    />
                  )
              )}
              {data.tasks.map(
                task =>
                  task.closed_at && (
                    <Task
                      key={task.id}
                      data={task}
                      openTasks={openTasks}
                      setOpenTasks={setOpenTasks}
                    />
                  )
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
