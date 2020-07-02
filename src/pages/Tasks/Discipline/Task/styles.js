import styled from "styled-components";

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

  .expanded {
    margin-top: 10px;

    span {
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
  }
`;
