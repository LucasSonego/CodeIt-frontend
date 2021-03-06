import React from "react";

import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  withStyles,
} from "@material-ui/core/";
import { Container } from "./styles";

export default function AccountType(props) {
  const BlueRadio = withStyles({
    root: {
      color: "#00adb5",
      "&$checked": {
        color: "#00adb5",
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

  return (
    <Container>
      <FormControl component="fieldset">
        <span className="label">Tipo de Conta:</span>
        <RadioGroup
          aria-label="tipo de conta"
          name="tipodeconta"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        >
          <FormControlLabel
            value="estudante"
            control={<BlueRadio />}
            label={<span className="label">Estudante</span>}
          />
          <FormControlLabel
            value="professor"
            control={<BlueRadio />}
            label={<span className="label">Professor</span>}
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
