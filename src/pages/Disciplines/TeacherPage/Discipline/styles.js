import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Container = styled.li`
  padding: 20px;
  margin: 0;
  border: 1px solid #999;
  border-radius: 4px;
  color: #333;

  .disciplinedata {
    .name {
      font-size: 18px;
    }
  }

  .id {
    color: #999;
    font-size: 12px;
    margin-left: 6px;
  }

  .basicinfo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
      .id {
        display: none;
      }
    }
  }

  .enrollmentcount {
    display: inline-flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }

  button {
    background: none;
    border: none;
    outline: none;
    padding: 0;

    svg {
      height: 24px;
      width: 24px;
    }

    .loading {
      animation: ${rotate} 0.3s infinite;
    }
  }

  .details {
    margin-top: 20px;
    display: grid;
    grid-gap: 10px;
  }

  .enrollmentlist {
    grid-gap: 5px;
    padding-left: 10px;
  }

  .toggleoptions {
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border: 1px solid #999;
    border-radius: 3px;
    @media (min-width: 601px) {
      width: min-content;
    }
  }

  .options {
    display: grid;
    grid-gap: 10px;

    .buttons {
      @media (min-width: 671px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      @media (max-width: 670px) {
        display: grid;
        grid-gap: 20px;
      }
    }

    input {
      height: 36px;
      color: #555;
    }

    button.rename {
      font-family: inherit;
      background: linear-gradient(120deg, #00adb5, #0097b5);
      height: 38px;
      color: #fff;
      border-radius: 3px;
      padding: 0 20px;

      @media (min-width: 671px) {
        width: 240px;

        transition: 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }

      @media (max-width: 670px) {
        width: 100%;
      }

      span {
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        svg {
          height: 16px;
          width: 16px;
          padding: 0 5px 3px 0;
        }
      }
    }
  }
`;

export const DeleteButton = styled.button`
  font-family: inherit;

  @media (min-width: 671px) {
    width: 240px;
    margin-left: 10px;
  }

  @media (max-width: 670px) {
    width: 100%;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    height: 38px;

    transition: 0.3s;
    @media (min-width: 601px) {
      &:hover {
        opacity: 0.8;
      }
    }

    background: ${props =>
      props.confirmation
        ? "linear-gradient(120deg, #ff9f05, #ff7e05)"
        : "linear-gradient(120deg, #e7673c, #e74c3c)"};

    svg {
      height: 16px;
      width: 16px;
      padding: 0 5px 3px 0;
    }
  }
`;
