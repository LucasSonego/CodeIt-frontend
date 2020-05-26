import styled from "styled-components";

export const Container = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
