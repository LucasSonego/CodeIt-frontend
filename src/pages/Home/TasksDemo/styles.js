import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .teacher,
  .student {
    margin: 20px;

    img {
      margin-bottom: 20px;
      @media (max-width: 1000px) {
        width: 85vw;
      }
    }

    .icon-tips {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .green {
        color: #2ecc71;
      }

      .yellow {
        color: #f1c40f;
      }

      .red {
        color: #d35400;
      }

      .grey {
        color: #555;
      }
    }
  }
`;
