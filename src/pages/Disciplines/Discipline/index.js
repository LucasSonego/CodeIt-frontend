import React from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

import { Container } from "./styles";

function Discipline(props) {
  return (
    <Container>
      <div>
        <div className="discipline">
          <span>{props.data.name}</span>
          <span className="id">{props.data.id}</span>
        </div>
        <span>{props.data.teacher.name}</span>
      </div>
      <button onClick={props.buttonAction}>
        {props.enrolled ? <FiMinusCircle /> : <FiPlusCircle />}
      </button>
    </Container>
  );
}

export default Discipline;
