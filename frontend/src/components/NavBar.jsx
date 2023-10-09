import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  width: 100vw;
  height: 70px;
  background: #fff;
  color: #000;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  font-size: 16px;
  font-weight: 500;
`;

const LeftBox = styled.div`
  display: flex;
  gap: 20px;
`;

const RightBox = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  display: flex;
  gap: 20px;
  background-color: transparent;
  cursor: pointer;
`;

function NavBar() {
  const [isLogin, setIsLogin] = useState(false);

  const logout = () => setIsLogin((prev) => !prev);

  return (
    <NavbarContainer>
      {isLogin ? (
        <>
          <LeftBox>
            <Link to={""}>Home</Link>
            <Link to="mybooking">MyBooking</Link>
          </LeftBox>
          <RightBox>
            <Button onClick={logout}>Logout</Button>
          </RightBox>
        </>
      ) : (
        <>
          <LeftBox>
            <Link to={""}>Home</Link>
          </LeftBox>
          <RightBox>
            <Link to="login" onClick={logout}>
              Login
            </Link>
            <Link to="register">Sign Up</Link>
          </RightBox>
        </>
      )}
    </NavbarContainer>
  );
}

export default NavBar;
