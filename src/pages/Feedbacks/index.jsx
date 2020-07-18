import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCodeSSlashLine } from "react-icons/ri";

import { Container } from "./styles";
import api from "../../services/api";

function Feedbacks() {
  const [answers, setAnswers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "feedbacks",
    });
    async function awaitAsyncCalls() {
      const token = localStorage.getItem("token");
      const response = await api.get("/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswers(response.data);
    }
    awaitAsyncCalls();
  }, [dispatch]);

  return (
    <Container>
      {answers && answers.length > 0 && (
        <ul>
          {answers.map(answer => (
            <li key={answer.id}>
              <div>
                <h3>{answer.task.title}</h3>
                <h4>{answer.task.discipline.name}</h4>
              </div>
              <div className="icons">
                {answer.accepted_at !== null ? (
                  <FaCheck className="green" title="Sua resposta foi aceita" />
                ) : (
                  <AiOutlineCloseCircle
                    className="red"
                    title="Sua resposta não foi aceita"
                  />
                )}
                {answer.feedback !== null && (
                  <MdFeedback
                    className={answer.accepted_at ? "grey" : "yellow"}
                    title="Feedback em texto disponível"
                  />
                )}
                {answer.feedback_code !== null && (
                  <RiCodeSSlashLine
                    className={answer.accepted_at ? "grey" : "yellow"}
                    title="Feedback em código disponível"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default Feedbacks;
