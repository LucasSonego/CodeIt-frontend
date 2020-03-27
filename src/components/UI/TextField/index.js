import React from "react";

import { Container, StyledInput } from "./styles";

export default function TextField(
  { label, type, value, onChange, error, onFocus },
  { ...rest }
) {
  return (
    <Container>
      <span>{label}</span>
      <StyledInput
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        error={error}
        onFocus={onFocus}
        spellCheck="false"
        {...rest}
      />
    </Container>
  );
}
