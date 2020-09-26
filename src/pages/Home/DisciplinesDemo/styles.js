import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  box-sizing: border-box;

  .teacher,
  .student {
    img {
      @media (max-width: 1000px) {
        width: 85vw;
      }
    }
  }
`;
