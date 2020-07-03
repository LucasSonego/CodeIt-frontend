import styled, { css } from "styled-components";

export const Container = styled.li`
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin: 0;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      background: none;

      svg {
        height: 20px;
        width: 20px;
      }
    }

    .info {
      span {
        font-size: 12px;
        color: #777;
        margin-right: 10px;
      }
    }
  }

  .buttons {
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column-reverse;
    }

    @media (min-width: 601px) {
      display: flex;
      justify-content: space-between;
    }

    button {
      width: 100%;
      margin-top: 10px;
      padding: 10px;
      border: none;
      border-radius: 3px;
      outline: none;
      color: #fff;
      font-family: inherit;
      font-size: 14px;

      transition: 0.3s;
      &:hover {
        opacity: 0.8;
      }

      @media (min-width: 601px) {
        max-width: 300px;
        &::last-child {
          margin-left: 10px;
        }
      }
    }
  }

  .expanded {
    margin-top: 10px;

    .label {
      color: #555;
    }

    .answers {
      list-style: none;
      padding: 0;
      display: grid;
      grid-gap: 8px;
    }

    .answer {
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 15px;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 4px;
      background: #f8f8f8;

      .data {
        display: block;
        text-align: left;

        p {
          margin: 0;
          color: #999;
        }
      }

      .icons {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 22px;
          width: 22px;
          margin-left: 5px;
        }

        .green {
          color: #2ecc71;
        }

        .yellow {
          color: #f1c40f;
        }

        .red {
          color: #d35400;
        }

        .grey {
          color: #555;
        }
      }
    }

    .yellow-background {
      background: linear-gradient(120deg, #f39c12, #e67e22);
    }

    .blue-background {
      background: linear-gradient(120deg, #00adb5, #0097b5);
    }

    .red-background {
      background: linear-gradient(120deg, #e7673c, #e74c3c);
    }

    .edit-task {
      .row {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
      }
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
