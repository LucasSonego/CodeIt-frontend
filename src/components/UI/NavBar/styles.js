import styled, { css } from "styled-components";

export const Container = styled.nav`
  width: 80px;
  height: 100vh;
  position: fixed;
  background: #333;
  font-family: inherit;
  font-size: 18px;
  top: 0px !important;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  a {
    width: 100%;
    height: 80px;
  }

  .navLink {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  img {
    width: 46px;
    margin: 0 17px;
  }

  svg {
    float: left;
    margin: 20px;
    min-height: 40px;
    min-width: 40px;
    color: #bbb;
  }

  span {
    display: none;
    white-space: nowrap;
  }

  transition: 0.2s width ease-out;

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
`;

export const NavItem = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-top: auto;
  }

  ${props =>
    props.currentPage &&
    css`
      box-sizing: border-box;
      border-left: 4px solid #eee;
      background-color: #444;

      svg {
        margin: 20px 24px 20px 16px;
        color: #eee;
      }
    `}
`;
