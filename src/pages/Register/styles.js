import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 250px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 8px;

    @media (min-width: 550px) {
      margin: 40px 0;
      padding: 50px;
      border: 1px solid #999;
    }
  }

  h1 {
    color: #999;
    text-align: center;
    font-size: 32px;
    margin: 40px 0 0 0;
  }

  .inputs {
    display: grid;
    grid-gap: 20px;
  }

  p {
    min-height: 40px;
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0 0 0;
  }

  .buttons {
    display: grid;
    grid-gap: 10px;
  }

  button {
    font-family: inherit;
    font-size: 16px;
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: none;
    color: #fff;
    background: linear-gradient(120deg, #00adb5, #009ca3);
    outline: none;

    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`;
