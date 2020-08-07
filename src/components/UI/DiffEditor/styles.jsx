import styled, { css } from "styled-components";

export const Container = styled.div`
  background: #222;
  padding: 5px 0;
  border-radius: 4px;
`;

export const SplitButton = styled.button`
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin: 0 10px 5px auto;

  svg {
    color: #eee;
    height: 18px;
    width: 18px;
  }

  ${props =>
    props.active &&
    css`
      background: #555;
    `}
`;
