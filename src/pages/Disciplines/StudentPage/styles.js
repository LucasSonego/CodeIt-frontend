import styled from "styled-components";

export const Container = styled.div`
  color: #333;
  @media (max-width: 600px) {
    .id {
      display: none;
    }
  }

  h3 {
    color: #555;
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
