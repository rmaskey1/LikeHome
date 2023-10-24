import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";

import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as MoneyIcon } from "../icons/money.svg";

import RoomImg from "../img/hotel-room.jpg";

const Container = styled.main`
  display: center;
  margin: auto;
  width: 70%;
  margin-top: 36px;
  height: 100vh;
  padding: 20px;
`;

const ListingTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-size: 23px;
  font-weight: 400;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f5;
  border-radius: 15px;
  margin-top: 20px;
  //padding: 20px;
  height: 225px; /* Set the card height, adjust as needed */
`;

const RoomImage = styled.img`
  position: relative;
  border: none;
  width: 300px;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  padding-bottom: 20px;
`;

const Divider = styled.hr`
  border: 1px solid #ccc;
  margin: 10px 0;
`;

const IconWithText = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-top: 15px;
`;

const Card = ({
  roomImage,
  address,
  fromDate,
  toDate,
  nights,
  totalCost,
  bookingId,
}) => (
  <Link to={`/booking/${bookingId}/modify`} style={{ textDecoration: "none" }}>
    <CardContainer>
      <RoomImage src={RoomImg} alt="Room" />
      <DetailsContainer>
        <SectionTitle>{address}</SectionTitle>
        <Divider />
        <IconWithText>
          <CalendarIcon style={{ marginRight: "15px" }} />
          <SubTitle>
            {" "}
            Dates: {fromDate} - {toDate}
          </SubTitle>
        </IconWithText>
        <IconWithText>
          <MoonIcon style={{ marginRight: "15px" }} />
          <SubTitle> {nights} Nights</SubTitle>
        </IconWithText>
        <IconWithText>
          <MoneyIcon style={{ marginRight: "15px" }} />
          <SubTitle> Total: ${totalCost}</SubTitle>
        </IconWithText>
      </DetailsContainer>
    </CardContainer>
  </Link>
);

function MyBookings() {
  //SAMPLE bookings data, please replace!!
  const bookingsData = [
    {
      bookingId: 1,
      roomImage: RoomImg,
      address: "123 Main St, San Jose, CA, USA",
      fromDate: "12/24/23",
      toDate: "12/26/23",
      nights: "2",
      totalCost: "2500.00",
    },
    {
      bookingId: 2,
      roomImage: RoomImg,
      address: "123 Main St, San Jose, CA, USA",
      fromDate: "12/28/23",
      toDate: "12/30/23",
      nights: "2",
      totalCost: "3000.00",
    },

    {
      bookingId: 3,
      roomImage: RoomImg,
      address: "123 Main St, San Jose, CA, USA",
      fromDate: "12/28/23",
      toDate: "12/30/23",
      nights: "2",
      totalCost: "3000.00",
    },
  ];

  return (
    <Container>
      <ListingTitle>My Bookings:</ListingTitle>

      {bookingsData.map((booking) => (
        <Card
          key={booking.bookingId} // Ensure each card has a unique key
          {...booking}
        />
      ))}
    </Container>
  );
}

export default MyBookings;
