import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  @media (min-width: 601px) {
    button {
      width: 200px;
    }

    li {
      display: block;
      box-sizing: border-box;
      width: 200px;
    }
  }

  @media (max-width: 600px) {
    button {
      width: 100%;
    }

    ul {
      width: 100%;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #999;
    background: none;
    outline: none;
    font-size: 16px;
    font-family: inherit;
    cursor: pointer;

    transition: 0.3s;

    &:hover {
      border: 1px solid #00adb5;
    }
  }

  ul {
    list-style: none;
    position: absolute;
    z-index: 100;
    margin: 0;
    padding: 0;

    li {
      padding: 10px;
      background: #fff;
      cursor: pointer;
      list-style: none;

      &:hover {
        background: #eee;
      }

      border-left: 1px solid #999;
      border-right: 1px solid #999;

      &:first-child {
        border-radius: 3px 3px 0 0;
        border-top: 1px solid #999;
      }

      &:last-child {
        border-radius: 0 0 3px 3px;
        border-bottom: 1px solid #999;
      }
    }
  }

  .backdrop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 90;
  }

  ${props =>
    props.disabled &&
    css`
      .selected {
        cursor: default;
        color: #999;

        &:hover {
          border: 1px solid #999;
        }
      }
    `}
`;
