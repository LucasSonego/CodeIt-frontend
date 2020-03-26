import React from "react";

import { Container } from "./styles";

export default function TextField(props) {
  return (
    <Container>
      <span>{props.label}</span>
      <input
        type={props.type}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        spellCheck="false"
      />
    </Container>
  );
}
