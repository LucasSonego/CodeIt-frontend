import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  width: 100%;
  padding: 20px;
  min-height: 68px;
  border: 1px solid #999;
  border-radius: 5px;
  font-family: inherit;
  background: none;
  outline: none;

  @media (max-width: 600px) {
    flex-direction: column;
    svg {
      margin-top: 8px;
      margin-right: 8px;
    }
  }

  @media (min-width: 601px) {
    align-items: center;
    justify-content: space-between;
    svg {
      margin-left: 8px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #444;
    text-align: left;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 26px;
      width: 26px;
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
`;
