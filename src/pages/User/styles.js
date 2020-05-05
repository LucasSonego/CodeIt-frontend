import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  @media (max-width: 600px) {
    margin-bottom: 60px;
  }

  @media (min-width: 601px) {
    margin-left: 80px;
  }

  @media (min-width: 880px) {
  }
`;

export const UserData = styled.div`
  display: grid;
  grid-gap: 30px;

  @media (min-width: 880px) {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    border: 1px solid #999;
    border-radius: 8px;
    padding: 40px;
  }
`;
