import React from "react";

import { Container } from "./styles";

export default function EditableContentBox(props) {
  return (
    <Container error={props.error}>
      {props.label && <span>{props.label}</span>}
      <input
        type={props.inputType || "text"}
        value={props.value || ""}
        onChange={props.onChange}
        spellCheck="false"
      />
    </Container>
  );
}
