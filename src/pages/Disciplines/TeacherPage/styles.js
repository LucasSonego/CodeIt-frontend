import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      color: #555;
    }

    button {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background: none;

      svg {
        height: 25px;
        width: 25px;
        color: #333;
        transition: 0.3s;
        @media (min-width: 601px) {
          &:hover {
            color: #999;
          }
        }
      }
    }
  }

  ul {
    display: grid;
    grid-gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
