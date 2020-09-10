import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import NotificationBody from "../../../components/Notification";
import { FiPlusCircle } from "react-icons/fi";

import api from "../../../services/api";
import useFetch from "../../../hooks/useFetch";

import { Container } from "./styles";
import Discipline from "./Discipline";

function StudentPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: disciplineList, mutate: mutateDisciplineList } = useFetch({
    path: "/disciplines",
    dispatch,
    history,
  });

  function sendNotification(content) {
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

  async function manageEnrollment(action, discipline, setLoadingState) {
    setLoadingState(true);
    const token = localStorage.getItem("token");

    let response;

    if (action === "create") {
      response = await api.post(
        `/enrollments/${discipline}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (action === "remove") {
      response = await api.delete(`/enrollments/${discipline}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return;
    }

    if (response.status === 200) {
      const content = (
        <NotificationBody
          type="success"
          description={`Matrícula ${
            action === "create" ? "efetuada" : "removida"
          } com sucesso`}
        />
      );
      sendNotification(content);
    } else {
      const content = (
        <NotificationBody
          type="error"
          description={`Não foi possível ${
            action === "create" ? "efetuada" : "removida"
          } sua matrícula`}
        />
      );
      sendNotification(content);
    }

    response = await api.get("/disciplines", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoadingState(false);
    mutateDisciplineList(response.data, false);
  }

  return (
    <Container>
      <div className="disciplines">
        <div className="enrolled-disciplines">
          <h3>Disciplinas que você está matriculado</h3>
          <ul>
            {disciplineList?.enrolled_disciplines &&
              disciplineList?.enrolled_disciplines?.map(discipline => (
                <Discipline
                  key={discipline.id}
                  data={discipline}
                  enrolled="true"
                  buttonAction={manageEnrollment}
                />
              ))}
            {disciplineList?.enrolled_disciplines?.length === 0 && (
              <div className="no-enrolled-disciplines">
                <span>
                  Você ainda não está matriculado em nenhuma disciplina
                  <br />
                  Para efetuar sua matricula em uma disciplina clique no
                </span>
                <FiPlusCircle />
              </div>
            )}
          </ul>
        </div>
        <div className="other-disciplines">
          <h3>Outras disciplinas</h3>
          <ul>
            {disciplineList?.disciplines &&
              disciplineList.disciplines.map(discipline => (
                <Discipline
                  key={discipline.id}
                  data={discipline}
                  buttonAction={manageEnrollment}
                />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default StudentPage;
