import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 601px) {
    margin-left: 80px;
    padding: 20px;
  }

  .disciplines {
    margin: 0 auto;
    max-width: 1200px;
    display: grid;
    grid-gap: 30px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 15px;
  }
`;
