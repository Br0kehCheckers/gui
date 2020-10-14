import styled from "styled-components";

export const Container = styled.header`
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & button {
    background: transparent;
    border: none;
    color: white;
    font-size: 30px;
  }
  & h1 {
    font-size: 20px;
    text-align: right;
    font-weight: bold;
    text-transform: uppercase;
  }

  & h1 > span {
    background: deepskyblue;
    padding: 5px 8px;
    font-size: 15px;
    color: #121212;
    border-radius: 15px;
  }
`;
