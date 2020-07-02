import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 601px) {
    margin: 0 0 0 80px;
  }

  @media (max-width: 600px) {
    margin: 0 0 60px 0;
  }
`;

export const TeacherPage = styled.ul`
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-gap: 10px;
  padding: 20px;
`;
