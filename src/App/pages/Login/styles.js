import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
  @media (max-width: 800px) {
    padding: 50px 0px;
  }

  & form {
    display: flex;
    width: 50%;
    flex-direction: column;

    @media (max-width: 800px) {
      width: 90%;
    }
  }

  & form > * {
    margin-bottom: 20px;
  }

  & .title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  & .title h1 {
    font-weight: lighter;
    font-size: 40px;
    text-align: center;

    text-transform: uppercase;
    color: deepskyblue;
  }

  & .formas-de-pagamento {
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    padding: 0px 50px;
  }
`;
