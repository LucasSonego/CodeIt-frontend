import styled, { css } from "styled-components";

export const Container = styled.div`
  ${props =>
    props.navBarMargin &&
    css`
      @media (min-width: 601px) {
        margin-left: 80px;
      }

      @media (max-width: 600px) {
        margin-bottom: 60px;
      }
    `}

  section {
    min-height: 100vh;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 100px;

      svg {
        height: 50px;
        width: 50px;

        margin-right: 20px;
      }
    }

    .teacher,
    .student {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .tip {
        margin: 5px 0;
        .icon {
          height: 20px;
          width: 20px;

          position: relative;
          top: 4px;
        }
      }
    }
  }

  .welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      height: 80px;

      @media (max-width: 400px) {
        height: auto;
        width: 80vw;
      }
    }

    h1 {
      color: #999;
      font-size: 35px;
      margin: 50px 5px 0 5px;
      text-align: center;
    }

    h2 {
      color: #888;
      margin: 0 5px;
      font-size: 20px;
      text-align: center;
    }

    .user-data {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        color: #888;
      }
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
      min-width: 150px;

      transition: 0.3s;
      &:hover {
        background: linear-gradient(120deg, #00adb5, #009ca3);
        color: #eee;
      }

      &:last-child {
        margin-left: 10px;
      }
    }
  }

  .disciplines {
    background: #eee;
  }
`;
