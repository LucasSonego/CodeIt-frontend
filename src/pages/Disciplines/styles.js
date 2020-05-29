import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  @media (min-width: 601px) {
    margin-left: 80px;
  }

  @media (max-width: 600px) {
    margin-bottom: 60px;

    .id {
      display: none;
    }
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

  .noenrolleddisciplines {
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    svg {
      margin-left: 6px;
      height: 26px;
      width: 26px;
    }
  }
`;
