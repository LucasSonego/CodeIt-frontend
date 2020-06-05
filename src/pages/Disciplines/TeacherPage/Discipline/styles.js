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

  display: grid;
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
`;

export const DeleteButton = styled.button`
  font-family: inherit;

  @media (min-width: 601px) {
    width: 240px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;

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
