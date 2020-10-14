import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 100px;
  z-index: 10;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  /* mobile */
  @media (max-width: 800px) {
    width: 85%;
  }

  & section {
  }

  & section > .category {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    opacity: 0.3;
    padding: 20px 10px;
  }
  & section a {
    text-decoration: none;
    color: #121212;
  }
  & section .item {
    width: 100%;
    border-left: 10px solid deepskyblue;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    transition: all 0.25s ease-in-out;
  }
  & section .item:hover {
    border-left: 20px solid deepskyblue;
    border-bottom-right-radius: 10px;
  }

  & .item > .online {
    background-color: #29db1c;
    padding: 5px;
    color: #555;
    border-radius: 20px;
  }
  & .item > .offline {
    background-color: #ff4444;
    padding: 5px;
    color: #f5f5f5;
    border-radius: 20px;
  }
`;
