import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as MoneyIcon } from "../icons/money.svg";

import { useQuery } from "react-query";
import { getMyBooking } from "api";
import { RiDeleteBin5Line } from "react-icons/ri";

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
  padding-right: 20px;
  height: 225px; /* Set the card height, adjust as needed */
`;

const RoomImage = styled.img`
  position: relative;
  border: none;
  width: 300px;
  height: 225px;
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

const ErrorMessageArea = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(207, 49, 106, 1);
  margin-left: 200px;
`;

const Cancel = styled.div`
  display: grid;
  place-content: center;
  margin-left: 20px;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: red;
  }
  svg {
    transition: none;
    scale: 1.3;
  }
`;

const CardLoading = () => (
  <CardContainer>
    <div
      style={{ width: "300px", height: "100%", background: "#f3f3f3" }}
    ></div>
    <DetailsContainer></DetailsContainer>
  </CardContainer>
);

const Card = (booking) => {
  const navigate = useNavigate();
  const nights = Math.floor(
    (new Date(booking.endDate).getTime() -
      new Date(booking.startDate).getTime()) /
      (24 * 3600 * 1000)
  );
  const subtotal = booking.price * nights;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  let dollarString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <CardContainer>
      <Link
        to={`/mybooking/${booking.rid}/modify`}
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
      >
        <RoomImage src={booking.imageUrl} alt="Room" />
        <DetailsContainer>
          <SectionTitle>{booking.hotelName}</SectionTitle>
          <Divider />
          <IconWithText>
            <CalendarIcon style={{ marginRight: "15px" }} />
            <SubTitle>
              {" "}
              Dates: {booking.startDate} - {booking.endDate}
            </SubTitle>
          </IconWithText>
          <IconWithText>
            <MoonIcon style={{ marginRight: "15px" }} />
            <SubTitle> {nights} Nights</SubTitle>
          </IconWithText>
          <IconWithText>
            <MoneyIcon style={{ marginRight: "15px" }} />
            <SubTitle> Total: {dollarString.format(total)}</SubTitle>
          </IconWithText>
        </DetailsContainer>
      </Link>
      <Cancel
        onClick={() =>
          navigate(`${booking.rid}/cancel`, {
            state: { roomData: booking },
          })
        }
      >
        <RiDeleteBin5Line />
      </Cancel>
    </CardContainer>
  );
};

function MyBookings() {
  const { isLoading, data } = useQuery(["myBooking"], getMyBooking);

  console.log(data);

  return (
    <Container>
      <ListingTitle>My Bookings:</ListingTitle>
      {isLoading ? (
        [1, 2].map((i) => <CardLoading key={i} />)
      ) : data.message ? (
        <ErrorMessageArea>{data.message}</ErrorMessageArea>
      ) : (
        data.map((booking) => (
          <Card
            key={booking.rid} // Ensure each card has a unique key
            {...booking}
          />
        ))
      )}
    </Container>
  );
}

export default MyBookings;
