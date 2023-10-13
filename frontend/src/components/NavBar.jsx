import { isLoginAtom } from "../atom";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  z-index: 500;
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
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("userinfo");
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.accessToken && localStorage.refreshToken) setIsLogin(true);
  }, [setIsLogin]);
  return (
    <NavbarContainer>
      {isLogin ? (
        // Logged in
        <>
          {location.pathname === "/add_listing" ? (
            // When adding listing
            <>
              <LeftBox>
                <Button onClick={() => navigate(-1)}>Back</Button>
              </LeftBox>
              <RightBox>
                <Button onClick={logout}>Logout</Button>
              </RightBox>
            </>
          ) : (
            <>
              <LeftBox>
                <Link to={"/home"}>Home</Link>
                {userinfo?.accountType !== "hotel" && (
                  <Link to="mybooking">MyBooking</Link>
                )}
                <Link to={`profile/${localStorage.uid}`}>Profile</Link>
              </LeftBox>
              <RightBox>
                <Button onClick={logout}>Logout</Button>
              </RightBox>
            </>
          )}
        </>
      ) : (
        // Without Login
        <>
          <LeftBox>
            <Link to={"/welcome"}>Home</Link>
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
