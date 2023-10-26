import styled from "styled-components";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as CheckmarkIcon } from "../icons/checkmark.svg";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckmarkIcon = styled(CheckmarkIcon)`
  width: 50%;
  height: 50%;
  margin-left: 120px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  padding: 20px;
  margin: 0;
`;

const MyBookings = styled.button`
  width: 500px;
  height: 50px;
  padding: 15px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff457b;
  }
`;

function BookingSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();
  const successText = window.location.pathname.includes("/cancel/success")
    ? "Cancel Request Success!"
    : "Booking Request Success!";

  const handleMyBookingsClick = () => {
    navigate("/mybooking");
  };

  return (
    <Container>
      <div>
        <StyledCheckmarkIcon />
        <Text>{successText}</Text>
        <MyBookings onClick={handleMyBookingsClick}>MyBookings</MyBookings>
      </div>
    </Container>
  );
}

export default BookingSuccess;
