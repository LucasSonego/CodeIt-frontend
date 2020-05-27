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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #999;
  border-radius: 4px;

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
    height: 26px;
    width: 26px;
  }
`;
