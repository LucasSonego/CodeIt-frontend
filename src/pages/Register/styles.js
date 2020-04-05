import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 50px;
    border: 1px solid #999;
    border-radius: 8px;
    margin: 40px 0 40px 0;

    @media (max-width: 600px) {
      border: none;
      height: 100%;
      width: 100vw;
      justify-content: center;
      margin: 0;
    }
  }

  img {
    height: 70px;

    @media (max-width: 400px) {
      height: 70px;
    }
  }

  h1 {
    color: #999;
    text-align: center;
    font-size: 40px;
    font-weight: normal;
    margin-bottom: 0;

    @media (max-width: 600px) {
      font-size: 26px;
    }
  }

  p {
    min-height: 40px;
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0 0 0;
  }

  button {
    font-family: inherit;
    font-size: 16px;
    width: 100%;
    height: 40px;
    border-radius: 0;
    border: none;
    color: #eee;
    background: #00adb5;
    outline: none;
    margin-top: 10px;

    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`;
