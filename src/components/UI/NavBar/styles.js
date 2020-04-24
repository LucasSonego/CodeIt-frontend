import styled, { css } from "styled-components";

export const Container = styled.nav`
  position: fixed;
  background: #333;
  font-family: inherit;
  font-size: 18px;
  overflow: hidden;

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
    margin: 0 17px;
  }

  span {
    display: none;
    white-space: nowrap;
  }

  @media (min-width: 600px) {
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
      color: #bbb;
    }

    transition: 0.3s width ease-out;

    &:hover {
      width: 300px;

      span {
        display: block;
        color: #eee;
      }
    }

    li:hover {
      background-color: #444;
      span,
      svg {
        color: #fefefe;
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
      color: #bbb;
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
  }

  ${props =>
    props.currentPage &&
    css`
      @media (min-width: 600px) {
        border-left: 4px solid #eee;
        background-color: #444;

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
        border-bottom: 4px solid #eee;
        svg {
          color: #fff;
        }
      }
    `}
`;
