import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    &:hover {
      cursor: text;
      input {
        border: 1px solid #999;
      }
    }
  }

  input {
    padding: 10px 5px;
    color: #555;
    font-family: inherit;
    font-size: 18px;
    outline: none;

    @media (min-width: 600px) {
      border: 1px solid transparent;
    }

    @media (max-width: 600px) {
      border: 1px solid #eee;
    }

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
  }
`;
