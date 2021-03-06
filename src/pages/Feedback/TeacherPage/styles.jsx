import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px 0;
  display: grid;
  grid-gap: 15px;

  @media (max-width: 1310px) {
    .use-padding {
      padding: 0 10px;
    }

    .language-selector {
      @media (max-width: 600px) {
        padding: 0 15px 15px 15px;
      }
    }

    .accepted {
      margin-left: 10px;
      margin-right: 10px;
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

    .discipline {
      color: #777;
    }

    .student {
      span {
        color: #777;
      }

      span:last-child {
        margin-left: 10px;
        color: #999;
      }
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

      transition: 0.2s;
      &:hover {
        background: #2ecc7115;
      }
    }

    .deny {
      background: #f39c1222;
      border: 2px solid #f39c12;
      color: #f39c12;

      transition: 0.2s;
      &:hover {
        background: #f39c1215;
      }
    }
  }
  .accepted {
    display: flex;
    background: #2ecc7122;
    border: 2px solid #2ecc71;
    color: #2ecc71;
    height: 41px;
    border-radius: 3px;
    font-size: 16px;
    font-family: inherit;
    font-weight: bold;
    align-items: center;
    justify-content: center;
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
