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
    display: grid;
    grid-gap: 5px;
    padding-left: 10px;
  }
`;
