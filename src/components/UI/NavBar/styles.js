import styled, { css } from "styled-components";

export const Container = styled.nav`
  position: fixed;
  background: #333;
  font-family: inherit;
  font-size: 18px;
  overflow: hidden;
  z-index: 999;

  ${props =>
    !props.visible &&
    css`
      display: none;
    `}

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  a {
    width: 100%;
    height: 80px;
  }

  button {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    outline: none;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  img {
    width: 46px;
    min-width: 46px;
    margin: 0 17px;
  }

  span {
    color: #999;
    white-space: nowrap;
  }

  @media (min-width: 601px) {
    width: 80px;
    height: 100vh;
    top: 0px !important;

    ul {
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    svg {
      float: left;
      margin: 20px;
      min-height: 40px;
      min-width: 40px;
      color: #999;
    }

    transition: 0.25s width ease-out;

    &:hover {
      width: 250px;
    }

    li:hover {
      background-color: #444;
      span,
      svg {
        color: #eee;
      }
    }
  }

  @media (max-width: 600px) {
    width: 100vw;
    height: 60px;
    bottom: 0;

    button {
      justify-content: center;
    }

    ul {
      flex-direction: row;
    }

    svg,
    img {
      margin: 0;
      float: left;
      min-height: 40px;
      min-width: 40px;
      color: #888;
    }

    a {
      height: 60px;
      display: flex;
      justify-content: center;
    }
  }
`;

export const NavItem = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &:last-child {
    margin-top: auto;
  }

  @media (max-width: 600px) {
    height: 60px;

    span {
      display: none;
    }
  }

  ${props =>
    props.currentPage &&
    css`
      @media (min-width: 601px) {
        border-left: 4px solid #eee;
        background-color: #444;

        span {
          color: #eee;
        }

        svg {
          margin: 20px 20px 20px 16px;
          color: #eee;
        }

        img {
          margin: auto 17px auto 13px;
        }
      }

      @media (max-width: 600px) {
        background-color: #555;
        border-bottom: 4px solid #fff;
        svg {
          color: #fff;
        }
      }
    `}
`;
