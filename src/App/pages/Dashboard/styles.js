import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .cards {
    display: flex;
    flex-direction: row;
    padding: 20px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 800px) {
      flex-direction: column;
      position: relative;
    }
  }
  & .cards > * {
    width: 40%;
    @media (max-width: 800px) {
      width: 100%;
      margin: 0px;
      margin-bottom: 20px;
    }
  }
`;
