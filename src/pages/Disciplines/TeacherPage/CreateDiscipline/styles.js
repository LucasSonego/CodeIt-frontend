import styled, { css } from "styled-components";

export const Container = styled.form`
  padding: 20px;
  border: 1px solid #999;
  border-radius: 4px;
  display: grid;
  grid-gap: 10px;

  @media (max-width: 600px) {
    .details {
      display: grid;
      grid-gap: 10px;
    }
  }

  @media (min-width: 601px) {
    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: ". .";
      grid-gap: 10px;
    }
  }

  @media (min-width: 1051px) {
    .inputs {
      grid-template-columns: 4fr 2fr;
      grid-template-areas: ". .";
    }
  }

  .inputs {
    display: grid;
    grid-gap: 10px;
  }

  input[type="number"] {
    width: 100%;
    min-width: 50px;
  }

  .yearinfo {
    display: grid;
    grid-template-areas: ". .";
    grid-gap: 20px;
  }

  h4 {
    margin: 0;
    color: #555;
  }

  .half {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    span {
      color: #999;
      margin: 0 0 5px 5px;
    }

    div {
      width: 90px;
      button {
        margin: 0;
        outline: none;
        font-family: inherit;
        width: 45px;
        height: 42px;
        text-align: center;
        font-weight: bold;
        &:first-child {
          border-radius: 3px 0 0 3px;
          border-top: 1px solid #999;
          border-right: none;
          border-bottom: 1px solid #999;
          border-left: 1px solid #999;
        }

        &:last-child {
          border-radius: 0 3px 3px 0;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          border-left: none;
        }
      }
    }
  }

  .error {
    min-height: 20px;
    font-size: 14px;
    margin: 0;
    color: #e74c3c;
  }

  .buttons {
    @media (min-width: 601px) {
      display: flex;
      justify-content: space-between;
      button:last-child {
        margin-left: 10px;
      }
    }

    @media (max-width: 600px) {
      margin-top: 10px;
      display: grid;
      grid-gap: 10px;
    }

    button {
      border: none;
      outline: none;
      border-radius: 3px;
      width: 100%;
      height: 40px;
      color: #eee;
      font-family: inherit;
      font-size: 16px;

      @media (min-width: 601px) {
        max-width: 350px;

        transition: 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .submitbutton {
    background: linear-gradient(120deg, #00adb5, #0097b5);
  }

  .cancellbutton {
    background: linear-gradient(120deg, #e7673c, #e74c3c);
  }
`;

export const HalfSelection = styled.button`
  background: ${props => (props.selected ? "#00adb5" : "#fff")};
  color: ${props => (props.selected ? "#fff" : "#888")};
  transition: 0.4s;

  &:hover {
    ${props =>
      props.selected
        ? css`
            opacity: 0.8;
          `
        : css`
            background: #eeeeee55;
          `};
  }
`;
