import styled from "styled-components";

export const Container = styled.div`
  font-family: inherit;
  width: 100%;

  @media (min-width: 880px) {
    height: 390px;
    max-width: 450px;
    margin-right: 30px;

    form {
      display: flex;
      flex-direction: column;
      height: 100%;
      button {
        margin-top: auto;
      }
    }
  }

  .userData {
    display: grid;
    grid-gap: 16px;
  }

  h2 {
    margin-top: 0;
    color: #777;
  }

  span {
    margin-left: 5px;
    color: #999;
  }
  .grr {
    min-height: 65px;

    p {
      color: #555;
      font-size: 18px;
      margin: 10px 11px;
    }
  }

  .error {
    min-height: 38px;
    font-size: 14px;
    margin: 5px 0;
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
