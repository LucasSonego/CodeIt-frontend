import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 601px) {
    margin-left: 80px;
    padding: 20px;

    .task {
      margin: auto auto;
      max-width: 1200px;
    }
  }

  @media (max-width: 600px) {
    .task {
      margin-bottom: 60px;
      .taskdata {
        padding: 15px;
      }
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

  .warning {
    padding: 15px 10px;
    background: linear-gradient(120deg, #f39c12, #e67e22);
    text-align: center;
    border-radius: 3px;
    margin-bottom: 10px;
    color: #333;
    font-size: 18px;
  }

  .disciplinedata {
    .discipline {
      .name {
        margin: 0;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .id {
        color: #777;
        display: none;
        margin-left: 5px;
      }

      @media (min-width: 601px) {
        display: flex;
        align-items: baseline;

        .id {
          display: block;
        }
      }
    }

    .teacher {
      .name {
        color: #333;
        font-size: 18px;
      }
      .email {
        color: #777;
      }

      @media (max-width: 600px) {
        display: flex;
        flex-direction: column;

        span {
          margin: 0;
        }
      }

      @media (min-width: 601px) {
        .email {
          margin-left: 5px;
        }
      }
    }
  }

  .taskdetails {
    padding: 15px 0 10px 0;
    h4 {
      margin: 0;
    }
  }

  .submit {
    padding: 10px 0;
    @media (max-width: 600px) {
      padding: 10px 20px;
    }

    .error {
      min-height: 20px;
      font-size: 14px;
      margin: 0;
      color: #e74c3c;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      width: 100%;
      border: none;
      outline: none;
      max-width: 1200px;
      height: 40px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      font-family: inherit;
      background: linear-gradient(120deg, #00adb5, #009ca3);
      border-radius: 3px;
      transition: 0.2s;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        background: linear-gradient(120deg, #7bb7ba, #6fa3a6);
        cursor: not-allowed;
      }
    }
  }
`;
