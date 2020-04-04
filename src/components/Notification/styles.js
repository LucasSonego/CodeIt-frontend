import styled, { css } from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  height: 40px;
  width: 100%;
  padding: 10px;
  ${(props) =>
    props.type === "success" &&
    css`
      background: linear-gradient(120deg, #00adb5, #0097b5);
    `}
  ${(props) =>
    props.type === "error" &&
    css`
      background: linear-gradient(120deg, #e7673c, #e74c3c);
    `}
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: inherit;
    color: #fff;
  }
`;
