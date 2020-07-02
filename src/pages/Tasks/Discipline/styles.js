import styled from "styled-components";

export const Container = styled.li`
  list-style: none;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 15px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .disciplinedata {
      .name {
        font-size: 18px;
        color: #555;
      }

      .id {
        color: #999;
        font-size: 14px;
        margin-left: 6px;

        @media (max-width: 600px) {
          display: none;
        }
      }
    }

    button {
      border: none;
      outline: none;
      background: none;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 22px;
        width: 22px;
      }
    }
  }
  .tasks {
    margin-top: 15px;
    padding: 0;
    list-style: none;
    display: grid;
    grid-gap: 6px;
  }

  .notasks {
    display: block;
    margin-top: 10px;
    color: #aaa;
  }

  .open-close {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 3px;
    outline: none;
    color: #fff;
    font-family: inherit;
    font-size: 14px;

    @media (min-width: 601px) {
      max-width: 300px;
    }
  }

  .yellow-background {
    background: linear-gradient(120deg, #f39c12, #e67e22);
  }

  .blue-background {
    background: linear-gradient(120deg, #00adb5, #0097b5);
  }
`;
