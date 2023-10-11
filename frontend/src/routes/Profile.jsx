import React, { useState } from "react";
import styled from "styled-components";
import DeleteAccountWarning from "components/DeleteAccountWarning";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    console.log("Account deleted");
    setShowDeleteConfirmation(false);
  };

  return (
    <Container>
      <ProfileBox>
        <div>Profile</div>
        <Label>First Name</Label>
        <Content>John</Content>
        <Label>Last Name</Label>
        <Content>Doe</Content>
        <Label>Email</Label>
        <Content>John.Doe@gmail.com</Content>
        <Label>Password</Label>
        <Content>123456789</Content>
        <Label>Phone Number</Label>
        <Content>408-123-4567</Content>
      </ProfileBox>
      <EditBtn>Edit Profile</EditBtn>
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
