import styled from "styled-components";

export const Container = styled.div`
  & main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;

    @media (max-width: 800px) {
      padding: 20px;
    }
  }

  textarea {
    background-color: #222;
    border: none;
    border-radius: 5px;
    padding: 30px;
    font-size: 18px;
    color: #ddd;
  }

  & .input {
    display: flex;
    flex-direction: column;
  }
  & .input > * {
    margin-bottom: 20px;
  }

  & .title > h1 {
    font-weight: bold;
    text-transform: uppercase;
    border-left: 10px solid deepskyblue;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
    border-bottom: 20px;
  }

  & .title > h2 {
    font-weight: 300;
    border-left: 10px solid lime;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
  }
  & .title > * {
    border-bottom: 20px;
    line-height: 40px;
  }
  & .stats {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  & .stats > div {
    margin: 0px;
    margin-bottom: 20px;
  }

  & .results > * {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  & .results > div > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  & .results > div > .header button {
    border: none;
    background: transparent;
    font-size: 14px;
    opacity: 0.7;
    color: #f5f5f5;
    font-weight: lighter;
    cursor: pointer;
  }

  & .results .lives {
    font-weight: light;
    border-left: 10px solid lime;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
  }
  & .results .dies {
    font-weight: light;
    text-transform: uppercase;
    border-left: 10px solid red;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
  }
  & .results > div > *:last-child > * {
    word-wrap: break-word;
    padding: 10px;
    border-bottom: 1px solid #222;
  }
  & .results .errors {
    font-weight: light;
    text-transform: uppercase;
    border-left: 10px solid orange;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
  }
`;
