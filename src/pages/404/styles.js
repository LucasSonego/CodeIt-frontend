import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 70px;
  }

  h1 {
    color: #999;
    font-size: 50px;
    margin: 50px 0 0 0;
  }

  h2 {
    color: #888;
    margin: 0;
  }

  button {
    font-family: inherit;
    font-size: 16px;
    margin-top: 50px;
    border-radius: 3px;
    outline: none;
    padding: 12px 20px;
    background: transparent;
    border: 1px solid #00adb5;
    color: #00adb5;
    font-weight: bold;

    transition: 0.3s;
    &:hover {
      background: linear-gradient(120deg, #00adb5, #009ca3);
      color: #eee;
    }
  }
`;
