import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  width: min-content;

  .language-selector {
    @media (max-width: 600px) {
      padding: 0 15px 15px 15px;
    }
    padding: 0 0 15px 0;
  }
`;
