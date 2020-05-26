import React from "react";
import { FiPlusCircle, FiMinus } from "react-icons/fi";

import { Container } from "./styles";

function Discipline(props) {
  return (
    <Container key={props.data.id}>
      <div>
        <div className="discipline">
          <span>{props.data.name}</span>
          <span className="id">{props.data.id}</span>
        </div>
        <span>{props.data.teacher.name}</span>
      </div>
      {props.enrolled ? <FiMinus /> : <FiPlusCircle />}
    </Container>
  );
}

export default Discipline;
