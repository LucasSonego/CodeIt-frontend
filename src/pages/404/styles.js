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
    margin: 20px 0 0 0;
  }

  h2 {
    color: #888;
    margin: 0;
  }

  button {
    font-family: inherit;
    font-size: 16px;
    margin-top: 40px;
    border: none;
    outline: none;
    padding: 10px;
    color: #333;

    transition: 0.3s;
    &:hover {
      background: #00adb5;
      color: #eee;
    }
  }
`;
