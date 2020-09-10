import React, { useState } from "react";

import { Container, HalfSelection } from "./styles";
import TextField from "../../../../components/UI/TextField";
import api from "../../../../services/api";
import { store } from "react-notifications-component";
import NotificationBody from "../../../../components/Notification";

function CreateDiscipline({ hideComponent, disciplines, mutateDisciplines }) {
  const [disciplineName, setDisciplineName] = useState("");
  const [disciplineNameError, setDisciplineNameError] = useState(false);
  const [disciplineID, setDisciplineID] = useState("");
  const [disciplineIDError, setDisciplineIDError] = useState(false);
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState(false);
  const [half, setHalf] = useState("1");
  const [formError, setFormError] = useState("");

  function sendSuccessNotification() {
    const content = (
      <NotificationBody
        type="success"
        message="Disciplina criada com sucesso"
      />
    );
    store.addNotification({
      content,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
      },
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!disciplineName) {
      setDisciplineNameError(true);
      setFormError("Preencha todos os campos corretamente");
    }
    if (!disciplineID) {
      setDisciplineIDError(true);
      setFormError("Preencha todos os campos corretamente");
    }
    if (!year) {
      setYearError(true);
      setFormError("Preencha todos os campos corretamente");
    }

    if (disciplineName && disciplineID && year) {
      const token = localStorage.getItem("token");
      let response;
      try {
        response = await api.post(
          "/disciplines",
          {
            name: disciplineName,
            id: `${year}${half}${disciplineID}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          sendSuccessNotification();
          hideComponent();
          let newDisciplineList = [...disciplines, response.data];
          mutateDisciplines(newDisciplineList, false);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          setDisciplineIDError(true);
          setYearError(true);
          setFormError(
            "Já ha uma disciplina cadastrada com este código para o mesmo ano e semestre"
          );
        }
      }
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <h4>Criar disciplina</h4>
      <div className="inputs">
        <TextField
          className="name"
          label="Nome da disciplina"
          type="text"
          onChange={setDisciplineName}
          value={disciplineName}
          error={disciplineNameError}
          onFocus={() => setDisciplineNameError(false)}
        />
        <div className="details">
          <TextField
            className="id"
            label="Código da disciplina"
            type="text"
            onChange={setDisciplineID}
            value={disciplineID}
            error={disciplineIDError}
            onFocus={() => setDisciplineIDError(false)}
          />
          <div className="yearinfo">
            <TextField
              className="year"
              label="Ano"
              type="number"
              onChange={setYear}
              value={year}
              error={yearError}
              onFocus={() => setYearError(false)}
            />

            <div className="half">
              <span>Semestre</span>
              <div>
                <HalfSelection
                  type="button"
                  onClick={() => setHalf("1")}
                  selected={half === "1"}
                >
                  ‎‎ 1°
                </HalfSelection>
                <HalfSelection
                  type="button"
                  onClick={() => setHalf("2")}
                  selected={half === "2"}
                >
                   2° 
                </HalfSelection>
              </div>
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
          onClick={() => hideComponent()}
        >
          Cancelar
        </button>
      </div>
    </Container>
  );
}

export default CreateDiscipline;
