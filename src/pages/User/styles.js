import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 20px 0 20px;

  @media (min-width: 600px) {
    margin-left: 80px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin-bottom: 80px;
  }
`;

export const UserData = styled.div`
  margin: 0;

  @media (min-width: 1405px) {
    margin: 0 auto 0 auto;
  }

  @media (min-width: 800px) {
    border-radius: 5px;
    border: 1px solid #999;
    padding: 40px;
    height: 400px;
    width: auto;
    max-width: 1250px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }

  h2 {
    color: #555;
    font-family: inherit;
    margin: 0 0 30px 0;
  }

  button {
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    color: #fff;
    background: #00adb5;
    border: none;
    outline: none;

    transition: 0.1s;
    &:hover {
      opacity: 0.8;
    }
  }

  .personalData {
    float: left;
    display: flex;
    flex-direction: column;

    @media (min-width: 1405px) {
      height: 100%;
      width: 450px;
      margin-right: 300px;
    }

    @media (min-width: 800px) and (max-width: 1405px) {
      height: 100%;
      width: 450px;
      margin-right: 20px;
    }

    @media (max-width: 800px) {
      button {
        margin: 20px 0 40px 0;
      }
    }

    span {
      color: #999;
    }

    p {
      color: #555;
      margin: 10px 0 20px 5px;
      font-size: 18px;
      min-height: 24px;
    }

    .error {
      margin: auto 0 10px 0;
      min-height: 20px;
      color: #e74c3c;
      font-size: 14px;
    }
  }

  .changePassword {
    @media (min-width: 800px) {
      height: 100%;
      width: 450px;
    }

    @media (max-width: 800px) {
      button {
        margin: 20px 0 0 0;
      }
    }

    .passwordFields {
      margin-top: 20px;
      display: grid;
      grid-gap: 30px;
    }

    display: flex;
    flex-direction: column;
    float: right;

    h3 {
      margin: 0;
    }

    .error {
      margin: auto 0 10px 0;
      min-height: 20px;
      color: #e74c3c;
      font-size: 14px;
    }
  }
`;
