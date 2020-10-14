import styled from "styled-components";

export const Card = styled.div`
  background-color: #222;
  border-radius: 5px;
  padding: 20px;
  margin: 5px;
  cursor: default;
  width: 100%;

  & .title {
    font-size: 15px;
    font-weight: ligth;
    text-transform: uppercase;
    color: #ddd;
  }

  & .text {
    font-size: 40px;
    font-weight: bold;
  }
`;
