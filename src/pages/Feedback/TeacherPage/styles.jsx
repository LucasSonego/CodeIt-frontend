import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px 0;
  display: grid;
  grid-gap: 15px;

  @media (max-width: 1230px) {
    .task-details,
    .editor span,
    .comment,
    .buttons {
      padding: 0 10px;
    }
  }

  .task-details {
    h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    p {
      margin: 0 0 10px 0;
      color: #555;
    }

    span {
      color: #999;
    }
  }

  .label {
    color: #888;
    display: block;
    margin-bottom: 5px;
  }

  .comment {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: grid;
    grid-gap: 10px;

    @media (min-width: 601px) {
      grid-template-areas: ". .";
    }

    button {
      outline: none;
      border-radius: 3px;
      padding: 10px;
      font-size: 16px;
      font-family: inherit;
      font-weight: bold;
    }

    .accept {
      background: #2ecc7122;
      border: 2px solid #2ecc71;
      color: #2ecc71;
    }

    .deny {
      background: #f39c1222;
      border: 2px solid #f39c12;
      color: #f39c12;
    }
  }
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
`;
