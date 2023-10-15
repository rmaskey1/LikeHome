import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteAccountWarning from "components/DeleteAccountWarning";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "api";
import { isLoginAtom } from "../atom";
import { useRecoilState } from "recoil";

const Container = styled.div`
  position: relative;
  display: grid;
  place-content: center;
  width: 100vw;
  height: 100vh;
`;

const ProfileBox = styled.div`
  height: 500px;
  width: 700px;
  font-size: 30px;
  font-weight: 700;
  color: rgba(41, 53, 69, 1);
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 30px;
`;

const Content = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const EditBtn = styled.div`
  display: grid;
  place-content: center;
  margin: 0 auto;
  width: 500px;
  height: 36px;
  background-color: rgba(207, 49, 106, 1);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgb(226, 99, 146);
  }
`;

const DeleteBtn = styled.div`
  position: absolute;
  display: grid;
  place-content: center;
  top: 150px;
  width: 205px;
  height: 36px;
  right: 20vw;
  color: rgba(255, 0, 0, 1);
  border: 1px solid rgba(255, 0, 0, 1);
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #ff5d5d;
    color: white;
  }
`;

function Profile() {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState(null);

  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    //   const accessToken = localStorage.getItem("accessToken");
    //   const id = localStorage.getItem("uid");
    //   if (!accessToken || !id) {
    //     console.log("Access token or user ID not found. Please log in.");
    //     return;
    //   }
    if (userinfo.accountType === "hotel") {
      const response = await fetch(
        `${SERVER_URL}/hotel?hid=${localStorage.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(),
        }
      );

      const data = await response.json();
      console.log(response.status, data);

      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("uid");
        localStorage.removeItem("userinfo");
        localStorage.clear();
        setServerError(null);
        navigate("/login");
      } else {
        setServerError(data.message);
      }
    } else {
      const response = await fetch(
        `${SERVER_URL}/user?uid=${localStorage.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(),
        }
      );

      const userResult = await response.json();
      console.log(response.status, userResult);

      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("uid");
        localStorage.removeItem("userinfo");
        localStorage.clear();
        setServerError(null);
        navigate("/login");
      } else {
        setServerError(userResult.message);
      }
    }
    setShowDeleteConfirmation(false);
  };

  const handleEditProfileClick = () => {
    // Use navigate to navigate to the desired route
    navigate("modify");
  };

  return (
    <Container>
      <ProfileBox>
        <div>Profile</div>
        <Label>First Name</Label>
        <Content>{userinfo.firstName}</Content>
        <Label>Last Name</Label>
        <Content>{userinfo.lastName}</Content>
        <Label>Email</Label>
        <Content>{userinfo.email}</Content>
        <Label>Password</Label>
        <Content>********</Content>
        <Label>Phone Number</Label>
        <Content>{userinfo.phone}</Content>
      </ProfileBox>
      <EditBtn onClick={handleEditProfileClick}>Edit Profile</EditBtn>
      <DeleteBtn onClick={handleDeleteClick}>Delete Account</DeleteBtn>
      {showDeleteConfirmation && (
        <DeleteAccountWarning
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Container>
  );
}

export default Profile;
