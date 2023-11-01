import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as BedIcon } from "../icons/bed.svg";
import { ReactComponent as SinkIcon } from "../icons/sink.svg";
import { useQuery } from "react-query";
import "react-calendar/dist/Calendar.css";
import { SERVER_URL, getListing } from "api";
import Amenity from "components/Amenity";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 36px;
  width: 70%;
  height: 100vh;
  padding: 20px;
`;

const HotelName = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Location = styled.div`
  margin-top: 12px;
  font-size: 26px;
  font-weight: 400;
`;

const Summary = styled.div`
  margin-top: 7px;
  font-size: 20px;
`;

const Board = styled.div`
  display: flex;
  margin-top: 19px;
  gap: 32px;
  div img {
    width: 100%;
    height: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 385px;
  height: 310px;
  border: 1px solid #888888;
`;

const Reserve = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 356px;
  height: 310px;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 15px;
`;

const Reservebtn = styled.button`
  width: 243px;
  height: 42px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const ReserveForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReserveDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const ReserveInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
`;
const ReserveInputLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ReserveDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 44px;
  letter-spacing: 1px;
  border-radius: 2px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 10px;
  span {
    font-size: 10px;
    font-weight: 600;
  }
`;

const GuestModBtn = styled.button`
  width: 20px;
  height: 20px;
  background: white;
  color: #7a7a7a;
  border: 1px solid #b0b0b0;
  border-radius: 15px;
  padding: 0;
  outline: 0;
  cursor: pointer;
  line-height: 18px;

  &:hover {
    border-color: #7a7a7a;
  }
`;

const DateSelector = styled.div`
  margin-top: 5px;
  font-size: 16px;
  font-weight: 200;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  position: absolute;
`;

const Divider = styled.div`
  width: 744px;
  height: 1px;
  background-color: #888888;
  margin: 30px 0;
`;

const Detail = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 33px;

  svg {
    width: 30px;
    height: 30px;
    stroke-width: 3px;
  }

  span {
    font-size: 24px;
    font-weight: 400;
  }
`;

const Dropdown = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 30px;
  font-weight: 600;
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 400;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #cf316a;
    color: #ffffff;
  }
`;

const Buttons = styled.button`
  background-color: #cf316a;
  width: 126px;
  height: 31px;
  font-size: 16px;
  color: #ffffff;
  padding: 5px 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    border: 2px solid #cf316a;
    color: #cf316a;
    background-color: #ffffff;
  }
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
`;

function Details() {
  const params = useParams();
  const navigate = useNavigate();

  const rid = params.id;
  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const { isLoading, data } = useQuery(["listing"], () => getListing(rid));
  const [numGuests, setNumGuests] = useState(2);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to handle the "Edit Listing" click event
  const handleEditListingClick = () => {
    // Use navigate to navigate to the desired route
    navigate(`modify`, { state: data });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const [checkInValue, checkInOnChange] = useState(
    data ? new Date(data.startDate) : new Date()
  );
  const [checkOnValue, checkOnOnChange] = useState(
    data ? new Date(data.endDate) : new Date()
  );
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const toggleShowCheckIn = () => setShowCheckIn(!showCheckIn);
  const toggleShowCheckOut = () => setShowCheckOut(!showCheckOut);

  const dateFormatted = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    });
  };

  const deleteListing = async () => {
    await fetch(`${SERVER_URL}/listing/${rid}`, { method: "delete" });
    await navigate("/home");
  };

  const isGuest = userinfo.accountType === "guest";
  const isReserved = false; //INTEGRATIONS! Add method to check if the user has reserved this listing

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <HotelName>{data.hotelName}</HotelName>
            </div>
            <div>
              {userinfo.accountType === "hotel" && (
                <Dropdown onClick={toggleDropdown}>
                  . . .
                  {isDropdownOpen && (
                    <DropdownContent>
                      <DropdownItem onClick={handleEditListingClick}>
                        Edit Listing
                      </DropdownItem>
                      <DropdownItem onClick={openDeleteModal}>
                        Delete Listing
                      </DropdownItem>
                    </DropdownContent>
                  )}
                </Dropdown>
              )}
            </div>
          </div>

          <Location>{`${data.street_name}, ${data.city}, ${data.state}`}</Location>
          <Summary>
            {data.numberGuests} Guests - {data.numberOfBeds} Beds -{" "}
            {data.numberOfBathrooms} Bath
          </Summary>
          <Board>
            <ImgContainer>
              <img src={data.imageUrl} alt="example" />
            </ImgContainer>

            {isGuest && isReserved ? (
              <Reserve>
                <div>You are currently reserving this listing.</div>
                <Reservebtn
                  onClick={() => navigate(`/mybooking/${rid}/modify`)}
                >
                  Modify Booking
                </Reservebtn>
                <Reservebtn
                  onClick={() => navigate(`/mybooking/${rid}/cancel`)}
                >
                  Cancel Booking
                </Reservebtn>
              </Reserve>
            ) : (
              //Render the default reserve container if not a guest or not reserved
              <Reserve>
                <div>
                  <span style={{ fontSize: "30px", fontWeight: 600 }}>
                    ${data.price}
                  </span>{" "}
                  <span style={{ fontSize: "20px", fontWeight: 400 }}>
                    per night
                  </span>
                </div>
                {/* <ReserveDateContainer>
                <ReserveDate
                  style={{
                    border: showCheckIn
                      ? "1px solid black"
                      : "1px solid transparent",
                  }}
                >
                  {showCheckIn && (
                    <CalendarContainer style={{ top: "49px", right: "-1px" }}>
                      <Calendar
                        hover
                        // @ts-ignore
                        onChange={checkInOnChange}
                        onClickDay={toggleShowCheckIn}
                        value={checkInValue}
                        locale="en-GB"
                      />
                    </CalendarContainer>
                  )}
                  <span>CHECK-IN</span>
                  <DateSelector onClick={toggleShowCheckIn}>
                    {checkInValue.toLocaleDateString()}
                  </DateSelector>
                </ReserveDate>
                <ReserveDate
                  style={{
                    border: showCheckOut
                      ? "1px solid black"
                      : "1px solid transparent",
                  }}
                >
                  {showCheckOut && (
                    <CalendarContainer style={{ top: "49px", left: "-1px" }}>
                      <Calendar
                        // @ts-ignore
                        onChange={checkOnOnChange}
                        onClickDay={toggleShowCheckOut}
                        value={checkOnValue}
                        locale="en-GB"
                      />
                    </CalendarContainer>
                  )}
                  <span>CHECK-OUT</span>
                  <DateSelector onClick={toggleShowCheckOut}>
                    {checkOnValue.toLocaleDateString()}
                  </DateSelector>
                </ReserveDate>
              </ReserveDateContainer> */}

                <ReserveForm>
                  <ReserveDateContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Check-in Date</ReserveInputLabel>
                      <ReserveDate>{dateFormatted(data.startDate)}</ReserveDate>
                    </ReserveInputContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Check-out Date</ReserveInputLabel>
                      <ReserveDate>{dateFormatted(data.endDate)}</ReserveDate>
                    </ReserveInputContainer>
                  </ReserveDateContainer>
                  <ReserveDateContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Guests</ReserveInputLabel>
                      <ReserveDate
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                          padding: "0 20px",
                        }}
                      >
                        <GuestModBtn
                          onClick={() =>
                            numGuests > 1 && setNumGuests(numGuests - 1)
                          }
                        >
                          -
                        </GuestModBtn>
                        <div>{numGuests} Guests</div>
                        <GuestModBtn
                          onClick={() =>
                            numGuests < data.numberGuests &&
                            setNumGuests(numGuests + 1)
                          }
                        >
                          {" "}
                          +
                        </GuestModBtn>
                      </ReserveDate>
                    </ReserveInputContainer>
                  </ReserveDateContainer>
                </ReserveForm>
                <Reservebtn
                  onClick={() =>
                    navigate("book", { state: { roomData: data, numGuests } })
                  }
                >
                  Reserve
                </Reservebtn>
              </Reserve>
            )}
          </Board>
          <Divider />
          <Detail>
            <h1>Room Details</h1>
            <DetailItem>
              <PersonIcon />
              <span>{data.numberGuests} Guests</span>
            </DetailItem>
            <DetailItem>
              <BedIcon />
              <span>
                {data.numberOfBeds} Beds / 2 {data.bedType}
              </span>
            </DetailItem>
            <DetailItem>
              <SinkIcon />
              <span>{data.numberOfBathrooms} Bath</span>
            </DetailItem>
          </Detail>
          <Divider />
          <Detail>
            <h1>Amenities</h1>
            {data.Amenities.map((item, i) => (
              <Amenity key={i} item={item} />
            ))}
          </Detail>

          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            contentLabel="Delete Listing Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              },
              content: {
                width: "400px",
                height: "fit-content",
                margin: "auto",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                border: "none",
              },
            }}
          >
            <SectionTitle>
              Are you sure you want to delete this listing?
            </SectionTitle>
            <br />
            <p>This action is irreversible.</p>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <Buttons onClick={deleteListing}>Yes</Buttons>
              </div>
              <div>
                <Buttons onClick={closeDeleteModal}>No</Buttons>
              </div>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Details;
