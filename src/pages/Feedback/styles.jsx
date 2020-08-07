import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 600px) {
    margin-bottom: 70px;

    .text {
      padding: 0 15px;
    }
  }

  @media (min-width: 601px) {
    margin-left: 80px;
  }
`;
