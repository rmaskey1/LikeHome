import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as MoneyIcon } from "../icons/money.svg";
import { ReactComponent as GuestIcon } from "../icons/person-fill.svg";

import { useQuery } from "react-query";
import { getMyBooking } from "api";

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

const ErrorSectionTitle = styled.div`
  margin-top: 20px;
  font-size: 23px;
  font-weight: 400;
  text-align: center; //center horizontally
  //margin-top: 50px;
  margin-top: 20%; //center vertically
  transform: translate(0, -50%); //vertical center
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
  height: 225px; //Set the card height, adjust as needed
  overflow: hidden;
`;

const RoomImage = styled.img`
  position: relative;
  border: none;
  width: 300px;
  height: 250px;
  object-fit: cover; //Ensure the image fits within the defined dimensions
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

const CardLoading = () => (
  <CardContainer>
    <div
      style={{ width: "300px", height: "100%", background: "#f3f3f3" }}
    ></div>
    <DetailsContainer></DetailsContainer>
  </CardContainer>
);

const Card = (booking) => {
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
    <CardContainer className="booking-card">
      <Link
        to={`/room/${booking.rid}`}
        state={booking}
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
            <MoonIcon style={{ marginRight: "15px" }} id="moon-icon" />
            <SubTitle> {nights} Night(s) </SubTitle>
          </IconWithText>
          <IconWithText>
            <GuestIcon
              style={{ marginRight: "15px", width: "24px", height: "24px" }}
            />
            <SubTitle> {booking.reserved_guests} Guests</SubTitle>
          </IconWithText>
          <IconWithText>
            <MoneyIcon style={{ marginRight: "15px" }} />
            <SubTitle> Total: {dollarString.format(total)}</SubTitle>
          </IconWithText>
        </DetailsContainer>
      </Link>
    </CardContainer>
  );
};

function MyBookings() {
  const { isLoading, data } = useQuery(["myBooking"], getMyBooking);

  console.log("data", data);

  return (
    <Container>
      <ListingTitle>My Bookings:</ListingTitle>
      {isLoading ? (
        [1, 2].map((i) => <CardLoading key={i} />)
      ) : data && data.message ? (
        <ErrorMessageArea>{data.message}</ErrorMessageArea>
      ) : data && data.length === 0 ? (
        <ErrorSectionTitle>No bookings made!</ErrorSectionTitle>
      ) : (
        data &&
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
