import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
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

    padding: 30px;
    width: 100%;
    max-width: 400px;

    @media (min-width: 550px) {
      border: 1px solid #999;
      border-radius: 5px;
      padding: 50px;
    }

    h1 {
      margin: 40px 0 0 0;
      text-align: center;
      color: #999;
      font-size: 32px;
      font-family: inherit;
    }

    p {
      min-height: 40px;
      color: #e74c3c;
      font-size: 16px;
      margin: 5px 0 0 0;
    }
    .buttons {
      display: grid;
      grid-gap: 10px;

      button {
        font-family: inherit;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 2px;
        padding: 10px;
        background: linear-gradient(120deg, #00adb5, #009ca3);
        color: #fff;
      }

      @media (min-width: 550px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: ". .";

        button {
          width: 100%;
          margin-bottom: 0;

          transition: 0.3s opacity;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
`;
