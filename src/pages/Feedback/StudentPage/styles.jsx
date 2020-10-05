import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1330px) {
    .use-padding {
      padding: 0 15px;
    }
    .dropdown {
      margin-left: 15px;
    }
  }

  h3,
  h4 {
    margin: 15px 0 5px 0;
  }

  p {
    margin: 5px 0 10px 0;
  }

  .language-label {
    padding-bottom: 15px;
  }

  .language {
    padding: 10px;
    box-sizing: border-box;

    border: 1px solid #999;
    border-radius: 3px;
    width: 200px;
    font-size: 16px;
    font-family: inherit;
  }

  .warning {
    background: linear-gradient(120deg, #f1c40f99, #f39c1299);
    padding: 15px;
    border-radius: 5px;
    color: #555;
    text-align: center;
  }

  .accepted {
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 10px;
    border: 3px solid #2ecc71;
    background: #2ecc7122;
    border-radius: 5px;
    color: #2ecc71;
    font-weight: bold;
    text-align: center;
  }

  .not-accepted {
    margin: 20px 0 10px 0;
    padding: 10px;
    border: 3px solid #d35400;
    background: #d3540022;
    border-radius: 5px;
    color: #d35400;
    font-weight: bold;
    text-align: center;
  }

  .edit-answer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    margin-top: 10px;
    background: #eee;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-family: inherit;
    font-size: 16px;

    svg {
      height: 16px;
      height: 16px;
      margin-left: 10px;
    }

    transition: 0.2s;
    &:hover {
      background: #ddd;
    }
  }

  .back {
    border: none;
    border-radius: 3px;
    outline: none;
    padding: 10px;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background: #eee;
    color: #333;
    margin-bottom: 10px;

    svg {
      height: 20px;
      width: 20px;
      margin-right: 5px;
      color: #555;
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;
