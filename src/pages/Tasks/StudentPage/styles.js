import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;

  h2 {
    margin: 0 0 15px 0;
  }

  .disciplines {
    list-style: none;
    display: grid;
    grid-gap: 30px;
    padding: 0;
    margin: 0;

    h3 {
      margin: 0 0 5px 0;
    }
  }

  .tasks {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 10px;
  }
`;
