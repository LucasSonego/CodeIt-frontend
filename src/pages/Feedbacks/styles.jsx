import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 600px) {
    margin-bottom: 60px;
  }

  @media (min-width: 601px) {
    margin-left: 80px;
    .wrapper {
      align-self: center;
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  @media (max-width: 1340px) {
    @media (max-width: 600px) {
      .wrapper {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    @media (min-width: 601px) {
      .wrapper {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  h2 {
    margin: 20px 0 15px 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-gap: 10px;
  }

  li {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 15px 20px;
    @media (min-width: 601px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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

    .info {
      display: flex;
      align-items: center;

      @media (max-width: 600px) {
        margin-top: 5px;
      }

      span {
        font-size: 12px;
        color: #888;
        margin-right: 10px;
      }

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

    transition: 0.2s;
    &:hover {
      background-color: #f9f9f9;
    }
  }
`;
