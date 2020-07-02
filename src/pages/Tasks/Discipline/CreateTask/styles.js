import styled, { css } from "styled-components";

export const Container = styled.div`
  margin-top: 15px;
  background: #f8f8f8;
  border-radius: 5px;

  button {
    background: none;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 15px;
    width: 100%;

    font-family: inherit;
    font-size: 16px;
    color: #555;

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      height: 22px;
      width: 22px;
      color: #777;
    }
  }

  .label {
    display: block;
    margin: 0 0 5px 5px;
  }

  .input-fields {
    display: grid;
    padding: 10px;
    grid-gap: 10px;

    .task-title,
    .task-description {
      display: flex;
      flex-direction: column;
    }
  }

  .buttons {
    @media (min-width: 601px) {
      display: flex;
      justify-content: space-between;
      button {
        max-width: 400px;

        &:last-child {
          margin-left: 10px;
        }
      }
    }

    @media (max-width: 600px) {
      display: grid;
      grid-gap: 10px;
    }

    button {
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      transition: 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }

    .create {
      background: linear-gradient(120deg, #00adb5, #0097b5);
    }
    .cancel {
      background: linear-gradient(120deg, #e7673c, #e74c3c);
    }
  }
`;

export const StyledInput = styled.input`
  padding: 8px;
  outline: none;
  border: 1px solid #999;
  border-radius: 3px;
  font-family: inherit;
  font-size: 16px;

  transition: 0.5s;

  &:focus {
    border: 1px solid #00adb5;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid #e74c3c;
    `}
`;

export const StyledTextArea = styled.textarea`
  padding: 8px;
  outline: none;
  border: 1px solid #999;
  border-radius: 3px;
  font-family: inherit;
  font-size: 16px;
  resize: none;

  transition: 0.5s;

  &:focus {
    border: 1px solid #00adb5;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid #e74c3c;
    `}
`;
