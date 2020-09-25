import styled from "styled-components";

export const Container = styled.footer`
  background: #444;
  padding: 10px;

  @media (min-width: 851px) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  @media (max-width: 850px) {
    display: grid;
    grid-gap: 30px;
    justify-content: center;
  }

  .about {
    display: flex;
    align-items: center;
    color: #eee;

    img {
      height: 75px;
      width: 75px;
      border-radius: 10px;
      margin-right: 15px;
    }

    h3 {
      margin: 0 0 5px 0;
    }

    .git,
    .email {
      display: flex;
      align-items: center;

      a {
        color: #eee;
        text-decoration: none;
      }

      svg {
        margin-right: 5px;
      }
    }
  }

  .issues {
    color: #eee;

    h4,
    p {
      margin: 0 0 5px 0;
    }

    a {
      padding: 5px 15px;
      color: #eee;
      text-decoration: none;
      display: flex;
      align-items: center;
      border: 1px solid #eee;
      border-radius: 4px;
      width: min-content;

      svg {
        margin-right: 5px;
        height: 20px;
        width: 20px;
      }

      transition: 0.4s;
      &:hover {
        background: #eeeeee22;
      }
    }
  }
`;
