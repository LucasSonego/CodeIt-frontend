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

  @media (max-width: 600px) {
    padding: 10px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #999;
  border-radius: 4px;

  button {
    background: none;
    border: none;
    outline: none;
  }

  .button,
  button:disabled {
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 601px) {
      transition: 0.2s;

      &:hover {
        color: #777;
      }
    }
  }

  .loading {
    animation: ${rotate} 0.5s infinite;
  }

  .discipline {
    display: flex;
    align-items: baseline;
    span {
      color: #222;
      font-size: 18px;
    }

    .id {
      font-size: 14px;
      color: #999;
      margin-left: 8px;
    }
  }

  svg {
    height: 36px;
    width: 36px;
  }
`;
