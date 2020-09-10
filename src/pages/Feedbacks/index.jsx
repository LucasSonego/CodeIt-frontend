import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCodeSSlashLine } from "react-icons/ri";

import { Container } from "./styles";
import pushToPage from "../../util/pushToPage";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

function Feedbacks() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: answers } = useFetch({
    path: `/feedback`,
    dispatch,
    history,
  });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      page: "feedbacks",
    });
  }, [dispatch]);

  return (
    <Container>
      <div className="wrapper">
        <h2>Feedbacks</h2>
        {answers && answers.length > 0 && (
          <ul>
            {answers?.map(answer =>
              answer.student ? (
                <li
                  key={answer.id}
                  onClick={() =>
                    pushToPage({
                      page: `feedback/${answer.id}`,
                      dispatch,
                      history,
                    })
                  }
                >
                  <div>
                    <h3>{answer.task.title}</h3>
                    <h4>{answer.task.discipline.name}</h4>
                    <h4>{answer.student.name}</h4>
                  </div>
                  <div className="info">
                    <span>
                      {new Date(answer.feedback_at).toLocaleTimeString([], {
                        timeStyle: "short",
                      })}{" "}
                      {new Date(answer.feedback_at).toLocaleDateString()}
                    </span>
                    {answer.accepted_at !== null ? (
                      <FaCheck
                        className="green"
                        title="A resposta foi aceita"
                      />
                    ) : (
                      <AiOutlineCloseCircle
                        className="red"
                        title="A resposta não foi aceita"
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
              ) : (
                <li
                  key={answer.id}
                  onClick={() =>
                    pushToPage({
                      page: `feedback/${answer.task.id}`,
                      dispatch,
                      history,
                    })
                  }
                >
                  <div>
                    <h3>{answer.task.title}</h3>
                    <h4>{answer.task.discipline.name}</h4>
                  </div>
                  <div className="info">
                    {answer.accepted_at !== null ? (
                      <FaCheck
                        className="green"
                        title="Sua resposta foi aceita"
                      />
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
              )
            )}
          </ul>
        )}
      </div>
    </Container>
  );
}

export default Feedbacks;
