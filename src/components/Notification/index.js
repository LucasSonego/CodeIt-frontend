import React from "react";

import { Container } from "./styles";

export default function Notification(props) {
  return (
    <Container type={props.type}>
      <span>{props.message}</span>
    </Container>
  );
}
