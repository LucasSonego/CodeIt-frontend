import React from "react";

import { Container } from "./styles";

export default function Notification(props) {
  return (
    <Container type={props.type}>
      {props.message && <span>{props.message}</span>}
      {props.description && <span>{props.description}</span>}
    </Container>
  );
}
