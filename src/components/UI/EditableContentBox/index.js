import React from "react";

import { Container } from "./styles";

export default function EditableContentBox({
  error,
  label,
  inputType,
  value,
  onChange,
  onFocus,
}) {
  return (
    <Container error={error}>
      {label && <span>{label}</span>}
      <input
        type={inputType || "text"}
        value={value || ""}
        onChange={onChange}
        spellCheck="false"
        onFocus={onFocus}
        required=""
        onInvalid={e =>
          inputType === "email" &&
          e.target.setCustomValidity("Este não é um email válido")
        }
        onInput={e => inputType === "email" && e.target.setCustomValidity("")}
      />
    </Container>
  );
}
