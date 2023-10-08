import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  width: 100vw;
  height: 60px;
  background: #fff;
  color: #000;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const LeftBox = styled.div`
  font-size: 20px;
`;
const CenterBox = styled.div``;
const RightBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 8px;
  background: #a877c5;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #847a8f;
  }
`;

function NavBar() {
  const navigate = useNavigate();

  const onButtonClick = (path) => {
    navigate(path);
  };

  return (
    <NavbarContainer>
      <LeftBox>Like Home</LeftBox>
      <CenterBox></CenterBox>
      <RightBox>
        <Button onClick={() => onButtonClick("")}>Home</Button>
        <Button onClick={() => onButtonClick("login")}>Log In</Button>
        <Button onClick={() => onButtonClick("register")}>Register</Button>
      </RightBox>
    </NavbarContainer>
  );
}

export default NavBar;
