import React, { useState } from "react";

import { Container } from "./styles";
import TextField from "../../../../components/UI/TextField";

function CreateDiscipline(props) {
  const [disciplineName, setDisciplineName] = useState("");
  const [disciplineID, setDisciplineID] = useState("");
  const [year, setYear] = useState("");
  const [half, setHalf] = useState("1");
  const [formError, setFormError] = useState("testing");

  return (
    <Container>
      <h4>Criar disciplina</h4>
      <div className="inputs">
        <TextField
          className="name"
          label="Nome da disciplina"
          type="text"
          onChange={setDisciplineName}
          value={disciplineName}
        />
        <div className="details">
          <TextField
            className="id"
            label="Código da disciplina"
            type="text"
            onChange={setDisciplineID}
            value={disciplineID}
          />
          <div className="yearinfo">
            <TextField
              className="year"
              label="Ano"
              type="number"
              onChange={setYear}
              value={year}
            />

            <div className="half">
              <span>Semestre</span>
              <select
                value={half}
                onChange={event => setHalf(event.target.value)}
              >
                <option value="1">1°</option>
                <option value="2">2°</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="error">{formError}</p>

      <div className="buttons">
        <button className="submitbutton" type="submit">
          Criar
        </button>
        <button
          className="cancellbutton"
          type="button"
          onClick={() => props.hideComponent()}
        >
          Cancelar
        </button>
      </div>
    </Container>
  );
}

export default CreateDiscipline;
