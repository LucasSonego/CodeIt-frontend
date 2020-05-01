import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    &:hover {
      cursor: text;
      input {
        border: 1px solid #999;
      }
    }
  }

  input {
    padding: 10px;
    color: #555;
    font-family: inherit;
    font-size: 18px;
    outline: none;
    border: 1px solid #eee;

    @media (min-width: 600px) {
      border: 1px solid transparent;
    }

    transition: 0.5s;
    &:focus {
      border: 1px solid #00adb5;
    }
  }

  ${props =>
    props.error &&
    css`
      input {
        border: 1px solid #e74c3c;
      }
    `}

  span {
    color: #999;
    margin: 0 0 5px 5px;
  }
`;
