import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;

  .teacher,
  .student {
    max-width: 1000px;
    text-align: center;
    img {
      margin-bottom: 20px;
      @media (max-width: 1000px) {
        width: 85vw;
      }
    }
  }
`;
