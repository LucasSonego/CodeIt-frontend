import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  span {
    color: #999;
    margin: 0 0 5px 5px;
  }
`;

export const StyledInput = styled.input`
  font-family: inherit;
  font-size: 16px;
  color: #999;
  padding: 0 10px;
  outline: none;
  height: 40px;
  border-radius: 0;
  border: 1px solid #999;
  &:focus {
    border: 1px solid #00adb5;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid #e74c3c;
    `}
`;
