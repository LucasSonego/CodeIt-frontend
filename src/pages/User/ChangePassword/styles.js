import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  @media (min-width: 880px) {
    height: 390px;
    max-width: 450px;

    form {
      display: flex;
      flex-direction: column;
      height: 100%;
      button {
        margin-top: auto;
      }
    }
  }

  h3 {
    color: #777;
    margin-top: 0;
  }

  .passwordFields {
    display: grid;
    grid-gap: 20px;
  }

  .error {
    min-height: 36px;
    margin: 5px 0;
    font-size: 14px;
    color: #e74c3c;
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
