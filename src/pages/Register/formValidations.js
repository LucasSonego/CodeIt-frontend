export function noEmptyFields({ fields: [...fields], setFormError }) {
  function handleEmptyField(field, setError) {
    if (field !== "") {
      return false;
    } else {
      setError(true);
      setFormError("Preencha todos os campos corretamente");
      return true;
    }
  }

  let isValid = true;
  fields.forEach(field => {
    if (handleEmptyField(field.value, field.setError)) {
      isValid = false;
    }
  });

  return isValid;
}

export function validatePasswords({
  password,
  confirmPassword,
  setPasswordError,
  setFormError,
}) {
  function passwordsMatch() {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setFormError("As senhas não sao iguas");
      return false;
    }
    return true;
  }

  function passwordIsLongEnough() {
    if (password.length < 6) {
      setPasswordError(true);
      setFormError("A senha deve conter ao menos 6 caracteres");
      return false;
    }
    return true;
  }

  if (passwordsMatch() && passwordIsLongEnough()) {
    return true;
  }
  return false;
}
