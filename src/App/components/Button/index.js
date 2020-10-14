import styled from "styled-components";

const Button = styled.button`
  background-color: deepskyblue;
  padding: 20px;
  border: none;
  border-radius: 5px;
  color: #121212;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;

  &.secondary {
    background-color: white;
    color: #121212;
  }
`;

export default Button;
