import React, { useState } from "react";
import styled from "styled-components";
import DeleteAccountWarning from "components/DeleteAccountWarning";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../api";
import { isLoginAtom } from "../atom";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  position: center;
  margin-top: 36px;
  justify-content: center;
  display: grid;
  //place-content: center;
  //align-items: center;
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
  top: 6px;
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

const Divider = styled.div`
  width: 744px;
  height: 1px;
  background-color: #888888;
  margin: 30px 0;
`;

function Profile() {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [serverError, setServerError] = useState({ status: 0, message: "" });
  const setIsLogin = useSetRecoilState(isLoginAtom);

  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const isGuestAccount = userinfo.accountType === "guest"; //check if it's a guest account

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
    const response = await fetch(`${SERVER_URL}/user?uid=${localStorage.uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });

    const userResult = await response.json();
    console.log(response.status, userResult);

    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("uid");
      localStorage.removeItem("userinfo");
      localStorage.clear();
      setServerError(null);
      navigate("/");
    } else {
      setServerError(userResult.message);
    }

    setIsLogin(false);
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
        <Content id="first-name-content">{userinfo.firstName}</Content>
        <Label>Last Name</Label>
        <Content id="last-name-content">{userinfo.lastName}</Content>
        <Label>Email</Label>
        <Content id="email-content">{userinfo.email}</Content>
        <Label>Password</Label>
        <Content>********</Content>
        <Label>Phone Number</Label>
        <Content id="phone-number-content">{userinfo.phone}</Content>
      </ProfileBox>
      <EditBtn id="edit-profile-button" onClick={handleEditProfileClick}>Edit Profile</EditBtn>
      {isGuestAccount && <Divider />}
      {isGuestAccount && (
        <ProfileBox>
          <div>My Reward Points</div>
          <Label>Reward Points Owned:</Label>
          <Content>{userinfo.rewardPoints}</Content>
        </ProfileBox>
      )}

      <DeleteBtn id="delete-account-button" onClick={handleDeleteClick}>Delete Account</DeleteBtn>
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
