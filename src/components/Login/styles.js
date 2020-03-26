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
  }

  img {
    height: 100px;
  }

  h1 {
    color: #999;
    text-align: center;
    font-size: 40px;
    font-weight: normal;
    margin-bottom: 0;
  }

  p {
    min-height: 40px;
    color: #e74c3c;
    font-size: 16px;
    margin: 5px 0 0 0;
  }

  div {
    display: flex;
    justify-content: space-between;

    button {
      font-family: inherit;
      font-size: 16px;
      width: 180px;
      height: 40px;
      border-radius: 0;
      border: none;
      color: #eee;
      background: #00adb5;
      outline: none;

      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
