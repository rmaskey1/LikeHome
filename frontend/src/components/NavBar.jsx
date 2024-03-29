import { isLoginAtom } from "../atom";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  width: 100vw;
  height: 70px;
  background: #293545;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  font-size: 16px;
  font-weight: 500;
  z-index: 500;
`;

const LeftBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const MiddleBox = styled.div`
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
  color: #fff;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  margin-right: 5px;
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
                <Button id="logout-btn" onClick={logout}>Logout</Button>
              </RightBox>
            </>
          ) : (
            <>
              <LeftBox>
                <LogoLink to={"/"}>
                  <LogoImage src={logo} alt="Logo" />
                  LikeHome
                </LogoLink>
              </LeftBox>
              <MiddleBox>
                <Link to={"/home"}>Home</Link>
                {userinfo?.accountType !== "hotel" && (
                  <Link id="myBooking-btn" to="mybooking">MyBooking</Link>
                )}
                <Link to={`profile/${localStorage.uid}`} id="profile-link">Profile</Link>
              </MiddleBox>
              <RightBox>
                <Button id="logout-btn" onClick={logout}>Logout</Button>
              </RightBox>
            </>
          )}
        </>
      ) : (
        // Without Login
        <>
          <LeftBox>
                <LogoLink to={"/"}>
                  <LogoImage src={logo} alt="Logo" />
                  LikeHome
                </LogoLink>
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
