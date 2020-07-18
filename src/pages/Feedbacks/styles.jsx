import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 600px) {
    margin-bottom: 60px;
    ul {
      padding: 10px 20px;
    }
  }

  @media (min-width: 601px) {
    margin-left: 80px;
    ul {
      padding: 10px;
    }
  }

  @media (min-width: 1320px) {
    ul {
      padding: 10px 0;
    }
  }

  ul {
    max-width: 1200px;
    margin: 0 auto;
    list-style: none;
    display: grid;
    grid-gap: 10px;
  }

  li {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h3 {
      margin: 0;
      color: #555;
      font-weight: normal;
    }

    h4 {
      margin: 0;
      color: #777;
      font-weight: normal;
    }

    .icons {
      display: flex;
      align-items: center;
      /* justify-content: center; */

      svg {
        height: 24px;
        width: 24px;
        margin-right: 10px;
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
        color: #888;
      }
    }
  }
`;
