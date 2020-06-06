import React, { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Container } from "./styles";

function Discipline(props) {
  const [loadingState, setLoadingState] = useState(false);

  return (
    <Container>
      <div>
        <div className="discipline">
          <span>{props.data.name}</span>
          <span className="id">{props.data.id}</span>
        </div>
        <span>{props.data.teacher.name}</span>
      </div>
      <button
        onClick={() =>
          props.buttonAction(
            props.enrolled ? "remove" : "create",
            props.data.id,
            setLoadingState
          )
        }
        disabled={loadingState}
      >
        {props.enrolled ? (
          loadingState ? (
            <AiOutlineLoading3Quarters className="loading" />
          ) : (
            <FiMinusCircle className="button" />
          )
        ) : loadingState ? (
          <AiOutlineLoading3Quarters className="loading" />
        ) : (
          <FiPlusCircle className="button" />
        )}
      </button>
    </Container>
  );
}

export default Discipline;
