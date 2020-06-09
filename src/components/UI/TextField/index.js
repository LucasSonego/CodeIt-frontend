import React from "react";

import { Container, StyledInput } from "./styles";

export default function TextField(
  { label, type, value, onChange, error, onFocus },
  { ...rest }
) {
  function updateValue(newValue) {
    if (type === "number") {
      if (newValue.match(/^[0-9]+$/) || newValue === "") {
        onChange(newValue);
      } else {
        onChange(value);
      }
    } else {
      onChange(newValue);
    }
  }

  return (
    <Container>
      <span>{label}</span>
      <StyledInput
        type={type === "password" ? "password" : "text"}
        value={value}
        onChange={e => updateValue(e.target.value)}
        error={error}
        onFocus={onFocus}
        spellCheck="false"
        inputMode={type === "number" ? "numeric" : "text"}
        {...rest}
      />
    </Container>
  );
}
