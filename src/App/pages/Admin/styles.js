import styled from "styled-components";

export const Container = styled.div`
  & main > div {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
  & select {
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
  }
  & main > div > * {
    margin-bottom: 20px;
  }

  & main > div > h3 {
    font-size: 28px;
  }
  & main > div > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
